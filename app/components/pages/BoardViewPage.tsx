import * as React from 'react';
import { graphql } from 'react-apollo';
import Masonry from 'react-masonry-component';
import {
  branch,
  compose,
  pure,
  renderComponent,
} from 'recompose';

import AddQuote from '../AddQuote/AddQuote';
import Modal from '../Modal';
import QuoteCard from '../QuoteCard';

import {
  IQuote,
  IPerson,
  IBoard,
} from '../../data/types';
// import * as GetQuoteListTypes from './__generated__/GetQuoteList';
import {
  userLikedItem,
} from '../../utils';

import * as GetBoardViewQuotes from '../../data/queries/GetBoardViewQuotes.graphql';

import GearIcon from '../../assets/gear-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';

export type BoardViewPageProps = {
  data: {
    loading: boolean
    error?: string
    board: IBoard
    quotes: {
      quotes: IQuote[]
      people: IPerson[]
    }
    user: IPerson
  }
  showBoardSettings: (boardId: string) => any
  showPersonStats: (personId: string) => any
  showQuoteInfo: (quote: IQuote) => any
  toggleQuoteLike: (quote: IQuote) => any
};

const BoardViewPageComponent: React.FC<BoardViewPageProps> = (props: BoardViewPageProps) => {
  const [state, setState] = React.useState(initialState);

  const {
    data: {
      error,
      board,
      quotes: {
        people: peopleList,
        quotes,
      },
      user,
    },
  } = props;
  if (error) {
    console.error(error);
    return <div>An error has occurred</div>;
  }
  const people: {[key: string]: IPerson} = {};
  peopleList.forEach((p: IPerson) => people[p._id] = p);

  const cards = quotes.map((quote: IQuote) => {
    const toggleQuoteLike = () => props.toggleQuoteLike(quote);
    return (
      <QuoteCard
        quote={quote}
        people={people}
        key={quote._id}
        showQuoteInfo={props.showQuoteInfo}
        showPersonStats={props.showPersonStats}
        onClick={() => props.showQuoteInfo(quote)}
        toggleQuoteLike={toggleQuoteLike}
        userLikedQuote={userLikedItem(quote, user)}
      />)
  });

  const displayAddQuoteModal = () => setState({...state, modal: ModalTypes.ADD_QUOTE});
  const closeModal = () => setState({...state, modal: ModalTypes.NONE});

  let modalChild;
  switch (state.modal) {
    case ModalTypes.ADD_QUOTE:
      modalChild =
        <AddQuote
          boardId={props.data.board._id}
          cancel={closeModal}
        />
  }
  let modal = modalChild ? <Modal close={closeModal}>{modalChild}</Modal> : null;

  const showBoardSettings = () => props.showBoardSettings(board._id);

  return (
    <div className="primary-content BoardView">
      <div className="header">
        <div />
        <span className="board-name">{board.name}</span>
        <div className="button-container">
          <div className="add-quote" onClick={displayAddQuoteModal}>
            <PlusIcon />
            <span className="title">Add Quote</span>
          </div>
          <div
            className="board-settings"
            onClick={showBoardSettings}
          >
            <GearIcon />
            <span className="title">Board Settings</span>
          </div>
        </div>
      </div>
      <Masonry className="quote-cards">
        {cards}
      </Masonry>
      {modal}
    </div>
  );
}

type ContainerProps = {
  data: {
    loading: boolean
    board: IBoard
  }
  match: {
    params: {
      boardId: string
    }
  }
};

type State = {
  modal: ModalTypes
};

enum ModalTypes {
  NONE = 'NONE',
  ADD_QUOTE = 'ADD_QUOTE',
}

const initialState: State = {
  modal: ModalTypes.NONE,
};

const data = graphql(
  GetBoardViewQuotes,
  {
    options: (props: ContainerProps) => ({
      variables: {
        boardId: props.match.params.boardId,
      },
    }),
  }
);

const displayLoadingState = branch(
  (props: ContainerProps) => props.data.loading,
  renderComponent(() => <div>Loading...</div>),
);

const displayInvalidState = branch(
  (props: ContainerProps) => !props.data.board,
  renderComponent(() => <div>Unknown board</div>),
);

const BoardViewPage = compose<BoardViewPageProps, ContainerProps>(
  data,
  displayLoadingState,
  displayInvalidState,
  pure,
)(BoardViewPageComponent);

export default BoardViewPage;
