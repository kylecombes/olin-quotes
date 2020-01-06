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

type Props = {
  board: IBoard | undefined;
  people: {
    [personId: string]: IPerson
  } | undefined;
  masonryLayoutTrigger: boolean;
  quotes: IQuote[] | undefined;
  showAddQuoteModal: () => AnyAction;
  showBoardSettings: (boardId: string) => AnyAction;
  showPersonStats: (personId: string) => AnyAction;
  showQuoteInfo: (quote: IQuote) => AnyAction;
  toggleQuoteLike: (quote: IQuote) => AnyAction;
  user: IPerson;
};

export default (props: Props) => {
  if (!props.people || !props.quotes || !props.board) return null;

  const cards = props.quotes.map(quote => {
    const toggleQuoteLike = () => props.toggleQuoteLike(quote);
    return (
      <QuoteCard
        quote={quote}
        people={props.people}
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
