import * as React from 'react';
import Masonry from 'react-masonry-component';
import { AnyAction } from 'redux';

import {
  IBoard,
  IQuote,
  IPerson,
} from '../../data/types';
import QuoteCard from '../QuoteCard';
import {
  indexOf,
} from '../../utils';

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

export default class BoardViewPage extends React.Component<Props> {

  render() {
    if (!this.props.people || !this.props.quotes || !this.props.board) return null;

    const cards = this.props.quotes.map(quote => {
      const toggleQuoteLike = () => this.props.toggleQuoteLike(quote);
      const userLikedQuote = quote.likes && indexOf(quote.likes, l => l.personId === this.props.userId) >= 0;
      return (
        <QuoteCard
          quote={quote}
          people={this.props.people}
          key={quote._id}
          showQuoteInfo={this.props.showQuoteInfo}
          showPersonStats={this.props.showPersonStats}
          onClick={() => this.props.showQuoteInfo(quote)}
          toggleQuoteLike={toggleQuoteLike}
          userLikedQuote={userLikedQuote}
        />)
    });
    return (
      <div className="primary-content BoardView">
        <div className="header">
          <div />
          <span className="board-name">{this.props.board.name}</span>
          <div className="button-container">
            <span
              onClick={this.props.showAddQuoteModal}
            >
              +
            </span>
          </div>
        </div>
        <span style={{display: 'none'}}>{this.props.masonryLayoutTrigger}</span>
        <Masonry className="quote-cards">
          {cards}
        </Masonry>
      </div>
    )
  }

}
