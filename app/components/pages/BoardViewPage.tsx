import * as React from 'react';
import Masonry from 'react-masonry-component';
import { AnyAction } from 'redux';
import {
  useParams,
} from 'react-router-dom';

import {
  IQuote,
  IPerson,
  INewQuote,
} from '../../data/types';
import {
  userLikedItem,
} from '../../utils';

import GearIcon from '../../assets/gear-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import QuoteCard from '../QuoteCard';
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddQuote from '../AddQuote/AddQuote';
import Modal from '../Modal';
// import * as GetQuoteListTypes from './__generated__/GetQuoteList';

type Props = {
  masonryLayoutTrigger: boolean;
  showBoardSettings: (boardId: string) => AnyAction;
  showPersonStats: (personId: string) => AnyAction;
  showQuoteInfo: (quote: IQuote) => AnyAction;
  toggleQuoteLike: (quote: IQuote) => AnyAction;
};

type State = {
  modalType: 'addQuote' | null
};

const INITIAL_STATE: State = {
  modalType: null,
};

const ADD_QUOTE = gql`
  mutation AddQuote($quote: NewQuote!) {
    addQuote(quote: $quote) {
      success
      message
      quote {
        _id
        addDate
        addedById
        boardId
        comments {
          content
          authorId
          added
        }
        likes {
          date
          personId
        }
        components {
          personId
          content
        }
      }
    }
  }
`;

const GET_BOARD_QUOTES = gql`
  query QuotesList($boardId: ID!, $after: String) {
      board(id: $boardId) {
        _id
        name
        description
      }
      quotes(board: $boardId, after: $after) {
          cursor
          hasMore
          quotes {
              _id
              addDate
              addedById
              boardId
              comments {
                  content
                  authorId
                  added
              }
              likes {
                  date
                  personId
              }
              components {
                  personId
                  content
              }
          }
          people {
              _id
              displayName
              avatarUrl
          }
      }
    user {
      _id
      firstName
      lastName
      displayName
      avatarUrl
    }
  }
`;

const BoardViewPage: React.FC<Props> = (props: Props) => {
  const [state, setState] = React.useState(INITIAL_STATE);
  const { boardId } = useParams();
  if (!boardId) {
    return <div>Unknown board</div>;
  }
  const {
    data,
    loading,
    error,
  } = useQuery(
    GET_BOARD_QUOTES,
    {
      variables: {
        boardId,
      },
    }
  );
  const [addQuoteMutation, { loading: addingQuote, error: quoteAddError }] = useMutation(ADD_QUOTE);
  if (loading) return null;
  if (error) {
    console.error(error);
    return <div>An error has occurred</div>;
  }
  const {
    board,
    quotes: {
      people: peopleList,
      quotes,
    },
    user,
  } = data;
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

  const showBoardSettings = () => props.showBoardSettings(board._id);

  const closeModal = () => setState({...state, modalType: null});
  const addQuote = (quote: INewQuote) => {
    addQuoteMutation({
      variables: {
        quote: {
          ...quote,
          boardId,
        },
      },
    }).then(() => closeModal());
  };
  const showAddQuoteModal = () => setState({...state, modalType: 'addQuote'});

  let modal;
  switch (state.modalType) {
    case 'addQuote':
      modal = <Modal close={closeModal} isClosable={true}>
        <AddQuote cancel={closeModal} people={peopleList} submit={addQuote} />
      </Modal>;
      break;
  }

  return (
    <div className="primary-content BoardView">
      {modal}
      <div className="header">
        <div />
        <span className="board-name">{board.name}</span>
        <div className="button-container">
          <div
            className="add-quote"
            onClick={showAddQuoteModal}
          >
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
      <span style={{display: 'none'}}>{props.masonryLayoutTrigger}</span>
      <Masonry className="quote-cards">
        {cards}
      </Masonry>
    </div>
  );
}

export default BoardViewPage;
