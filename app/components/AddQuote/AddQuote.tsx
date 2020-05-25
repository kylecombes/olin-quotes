import * as React from 'react';
import AddQuoteComponent from './AddQuoteComponent';
import { graphql } from 'react-apollo';
import {
  compose,
  pure,
  withHandlers,
} from 'recompose';
import {
  INewQuote,
  IPerson,
  IQuote,
  IQuoteComponent,
} from '../../data/types';

import * as AddQuoteMutation from '../../data/mutations/AddQuote.graphql';
import * as GetBoardMembers from '../../data/queries/GetBoardMembers.graphql';
import * as GetBoardViewQuotes from '../../data/queries/GetBoardViewQuotes.graphql';

type ComponentProps = {
  cancel: () => any
  data: {
    boardMembers: IPerson[]
    loading: boolean
    error: string
  }
  onAddPersonClicked?: () => any
  submit: (data: INewQuote) => any
};

type State = {
  components: IQuoteComponent[]
  context: string
};

const createEmptyComponent = (): IQuoteComponent => ({
  content: '',
  personId: null,
});

export class AddQuote extends React.Component<ComponentProps, State> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = Object.assign({}, this.originalState);
  }

  originalState = {
    components: [
      createEmptyComponent(),
      createEmptyComponent(),
    ],
    context: '',
  };

  onQuoteComponentChange = (componentIdx: number, newPartialData: {personId?: string, words?: string}) => {
    let components = [...this.state.components];
    components[componentIdx] = {...components[componentIdx], ...newPartialData};
    if (componentIdx === components.length-1) { // Last slot used, so add a new one
      components.push(createEmptyComponent());
    }

    this.setState({components});
  };

  onContextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({context: event.target.value});

  onAddClicked = () => {
    // Only keep components that have words and an author
    // TODO: Some input validation with feedback to the user
    const components = Object.values(this.state.components).filter(comp => comp.content && comp.personId);

    const data: INewQuote = {components};
    if (this.state.context) {
      data.context = this.state.context;
    }

    this.props.submit(data);
  };

  render() {

    const quoteComponentEntryElms = this.state.components.map((quoteComponent, idx) => (
      <AddQuoteComponent
        key={idx}
        onComponentChange={newPartialData => this.onQuoteComponentChange(idx, newPartialData)}
        contentPlaceholder="Quote"
        speakerPlaceholder="Person"
        people={this.props.data.boardMembers}
        onAddPersonClick={this.props.onAddPersonClicked}
        {...quoteComponent}
      />
    ));

    return (
      <div className="AddQuote">
        <div className="header">
          <span>Add Quote</span>
        </div>
        {quoteComponentEntryElms}
        <textarea className="context" onChange={this.onContextChanged} placeholder="Context" value={this.state.context}/>
        <button className="clear" onClick={this.props.cancel}>Discard</button>
        <button className="submit" onClick={this.onAddClicked}>Add</button>
      </div>
    )
  }

}

type ContainerProps = {
  boardId: string
  done: () => any
};

const data = graphql(
  GetBoardMembers,
  {
    options: (props: ContainerProps) => ({
      variables: {
        boardId: props.boardId,
      },
    }),
  }
);

type AddQuoteMutationResponse = {
  data: {
    addQuote: {
      success: boolean
      message?: string
      quote: IQuote
    }
  }
};

type QuoteConnection = {
  cursor: string
  hasMore: boolean
  people: IPerson[]
  quotes: IQuote[]
};

const mutation = graphql(
  AddQuoteMutation,
  {
    options: {
      update: (proxy, { data: { addQuote }}: AddQuoteMutationResponse) => {
        const quote = addQuote.quote;
        const data: { quotes: QuoteConnection } = proxy.readQuery({
          query: GetBoardViewQuotes,
          variables: {
            boardId: quote.boardId,
          },
        });
        data.quotes.quotes.unshift(quote);
        proxy.writeQuery({
          query: GetBoardViewQuotes,
          data,
        });
      },
    },
  },
  );

const AddQuoteContainer = compose<ComponentProps, ContainerProps>(
  data,
  mutation,
  withHandlers({
    cancel: ({ done }) => done(),
    submit: ({ mutate, boardId, done }: { mutate: Function, boardId: String, done: Function }) => {
      return (quote: INewQuote): Promise<any> => {
        return mutate({
          variables: {
            quote: {
              boardId,
              ...quote,
            }
          },
        }).then(() => done());
      }
    },
  }),
  pure,
)(AddQuote);

export default AddQuoteContainer;
