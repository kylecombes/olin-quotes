import * as React from 'react';
import AddQuoteComponent from './AddQuoteComponent';
import {
  INewQuote,
  IPerson,
  IQuoteComponent,
} from '../../data/types';

type Props = {
  cancel: () => any
  onAddPersonClicked?: () => any
  people: IPerson[]
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

export default class AddQuote extends React.Component<Props, State> {

  constructor(props: Props) {
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

    const quoteComponentEntryElems = this.state.components.map((quoteComponent, idx) => (
      <AddQuoteComponent
        key={idx}
        onComponentChange={newPartialData => this.onQuoteComponentChange(idx, newPartialData)}
        contentPlaceholder="Quote"
        speakerPlaceholder="Person"
        people={this.props.people}
        onAddPersonClick={this.props.onAddPersonClicked}
        {...quoteComponent}
      />
    ));

    return (
      <div className="AddQuote">
        <div className="header">
          <span>Add Quote</span>
        </div>
        {quoteComponentEntryElems}
        <textarea className="context" onChange={this.onContextChanged} placeholder="Context" value={this.state.context}/>
        <button className="clear" onClick={this.props.cancel}>Discard</button>
        <button className="submit" onClick={this.onAddClicked}>Add</button>
      </div>
    )
  }

}
