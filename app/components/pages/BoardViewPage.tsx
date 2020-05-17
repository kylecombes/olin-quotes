import * as React from 'react';
import Masonry from 'react-masonry-component';
import { AnyAction } from 'redux';

import {
  IBoard,
  IQuote,
  IPerson,
} from '../../data/types';
import {
  userLikedItem,
} from '../../utils';

import GearIcon from '../../assets/gear-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import QuoteCard from '../QuoteCard';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import * as GetQuoteListTypes from './__generated__/GetQuoteList';

type Props = {
  board: IBoard | undefined;
  masonryLayoutTrigger: boolean;
  showAddQuoteModal: () => AnyAction;
  showBoardSettings: (boardId: string) => AnyAction;
  showPersonStats: (personId: string) => AnyAction;
  showQuoteInfo: (quote: IQuote) => AnyAction;
  toggleQuoteLike: (quote: IQuote) => AnyAction;
  user: IPerson;
};

const GET_QUOTES = gql`
  query QuotesList($after: String) {
      quotes(after: $after) {
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
  }
`;

export default (props: Props) => {
  const {
    data,
    loading,
    error,
  } = useQuery(GET_QUOTES);
  if (loading || !props.board) return null;
  const {
    people: peopleList,
    quotes,
  } = data.quotes;
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
        userLikedQuote={userLikedItem(quote, props.user)}
      />)
  });

  const showBoardSettings = () => props.showBoardSettings(props.board._id);

  return (
    <div className="primary-content BoardView">
      <div className="header">
        <div />
        <span className="board-name">{props.board.name}</span>
        <div className="button-container">
          <div
            className="add-quote"
            onClick={props.showAddQuoteModal}
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
