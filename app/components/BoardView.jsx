import React from 'react';
import Masonry from 'react-masonry-component';
import QuoteCard from './QuoteCard';

export default class BoardView extends React.Component {

  render() {
    if (!this.props.people || !this.props.quotes || !this.props.board) return null;

    const cards = Object.keys(this.props.quotes).map(quoteId => {
      const quoteData = this.props.quotes[quoteId];
      return (
        <QuoteCard
          quote={quoteData}
          people={this.props.people}
          key={quoteId}
          showPersonStats={this.props.showPersonStats}
          onClick={() => this.props.showQuoteInfo(quoteId)}
        />)
    });
    return (
      <div className="primary-content BoardView">
        <div className="header">
          <div />
          <span className="board-name">{this.props.board.name}</span>
          <div className="button-container">
            <button
              onClick={this.props.showAddQuoteModal}
            >
              Add Quote
            </button>
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
