import React from 'react';
import QuoteCard from './quote-card';
import QuoteAdd from '../containers/quote-add';

export default class MultiQuoteView extends React.Component {

  render() {
    const cards = Object.keys(this.props.quotes).map(quoteId => {
      const quoteData = this.props.quotes[quoteId];
      return (
        <QuoteCard
          quote={quoteData}
          people={this.props.people}
          key={quoteId}
          showPersonStats={this.props.showPersonStats}
        />)
    });
    return (
      <div className="primary-content multi-quote-view">
        <QuoteAdd onAddPersonClicked={this.props.onAddPersonClicked}/>
        <div className="quote-cards">
          {cards}
        </div>
      </div>
    )
  }

}