import React from 'react';
import Masonry from 'react-masonry-component';
import QuoteAdd from '../containers/quote-add';
import QuoteCard from './quote-card';

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
        <span style={{display: 'none'}}>{this.props.masonryLayoutTrigger}</span>
        <QuoteAdd onAddPersonClicked={this.props.onAddPersonClicked}/>
        <Masonry className="quote-cards">
          {cards}
        </Masonry>
      </div>
    )
  }

}