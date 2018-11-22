import React from 'react';
import QuoteCard from './quote-card';

export default class MultiQuoteView extends React.Component {

  render() {
    const cards = Object.keys(this.props.quotes).map(quoteId => {
      const quoteData = this.props.quotes[quoteId];
      const authorId = quoteData.components[0].personId;
      return (
        <QuoteCard
          quote={quoteData}
          author={this.props.people[authorId]}
          key={quoteId}
        />)
    });
    return (
      <div className="primary-content multi-quote-view">
        <div className="quote-cards">
          {cards}
        </div>
      </div>
    )
  }

}