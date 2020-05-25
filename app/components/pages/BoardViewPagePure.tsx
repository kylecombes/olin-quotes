import * as React from 'react';
import Masonry from 'react-masonry-component';

import {
  IQuote,
  IPerson,
  IBoard,
} from '../../data/types';
import {
  userLikedItem,
} from '../../utils';

import GearIcon from '../../assets/gear-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import QuoteCard from '../QuoteCard';

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

const BoardViewPagePure: React.FC<BoardViewPageProps> = (props: BoardViewPageProps) => {
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

  const showBoardSettings = () => props.showBoardSettings(board._id);

  return (
    <div className="primary-content BoardView">
      <div className="header">
        <div />
        <span className="board-name">{board.name}</span>
        <div className="button-container">
          <div className="add-quote">
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
    </div>
  );
}

export default BoardViewPagePure;
