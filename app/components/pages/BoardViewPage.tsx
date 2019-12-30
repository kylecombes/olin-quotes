import * as React from 'react';
import Masonry from 'react-masonry-component';
import { AnyAction } from 'redux';

import {
  IBoard,
  IQuote,
  IPerson,
} from '../../data/types';
import {
  indexOf,
} from '../../utils';

import PlusIcon from '../../assets/plus-icon.svg';
import QuoteCard from '../QuoteCard';

type Props = {
  board: IBoard | undefined;
  people: {
    [personId: string]: IPerson
  } | undefined;
  masonryLayoutTrigger: boolean;
  quotes: IQuote[] | undefined;
  showAddQuoteModal: () => AnyAction;
  showPersonStats: (personId: string) => AnyAction;
  showQuoteInfo: (quote: IQuote) => AnyAction;
  toggleQuoteLike: (quote: IQuote) => AnyAction;
  userId: string;
};

export default (props: Props) => {
  if (!props.people || !props.quotes || !props.board) return null;

  const cards = props.quotes.map(quote => {
    const toggleQuoteLike = () => props.toggleQuoteLike(quote);
    const userLikedQuote = quote.likes && indexOf(quote.likes, l => l.personId === props.userId) >= 0;
    return (
      <QuoteCard
        quote={quote}
        people={props.people}
        key={quote._id}
        showQuoteInfo={props.showQuoteInfo}
        showPersonStats={props.showPersonStats}
        onClick={() => props.showQuoteInfo(quote)}
        toggleQuoteLike={toggleQuoteLike}
        userLikedQuote={userLikedQuote}
      />)
  });
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
            <span className="add-quote-text">Add Quote</span>
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
