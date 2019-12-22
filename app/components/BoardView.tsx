import * as React from 'react';
import Masonry from 'react-masonry-component';
import { AnyAction } from 'redux';

import {
  IBoard,
  IQuote,
  IPerson,
} from '../data/types';
// @ts-ignore
import QuoteCard from './QuoteCard';

type Props = {
  board: IBoard | undefined;
  people: {
    [personId: string]: IPerson
  } | undefined;
  masonryLayoutTrigger: boolean;
  quotes: IQuote[] | undefined;
  showAddQuoteModal: () => AnyAction;
  showPersonStats: (personId: string) => AnyAction;
  showQuoteInfo: (quoteId: string) => AnyAction;
};

export default class BoardView extends React.Component<Props> {

  render() {
    if (!this.props.people || !this.props.quotes || !this.props.board) return null;

    const cards = this.props.quotes.map(quote => {
      return (
        <QuoteCard
          quote={quote}
          people={this.props.people}
          key={quote._id}
          showPersonStats={this.props.showPersonStats}
          onClick={() => this.props.showQuoteInfo(quote._id)}
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
