import React from 'react';
import QuoteCard from './quote-card';

export default class MultiQuoteView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quotes: {
        1: {
          text: 'Hello, I am blurb',
          author: {
            name: 'Kyle Combes',
            avatarUrl: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p240x240/33378141_1701257156667136_1329989739066949632_n.jpg?_nc_cat=100&_nc_ht=scontent-lga3-1.xx&oh=86cbc705dd56b1b0e7f4d65cc44b8222&oe=5C7DDEDE',
          }
        },
        2: {
          text: 'Bist du ein Mann?',
          author: {
            name: 'Kyle Combes',
            avatarUrl: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p240x240/33378141_1701257156667136_1329989739066949632_n.jpg?_nc_cat=100&_nc_ht=scontent-lga3-1.xx&oh=86cbc705dd56b1b0e7f4d65cc44b8222&oe=5C7DDEDE',
          }
        },
      }
    }
  }

  render() {
    const cards = Object.keys(this.state.quotes).map(quoteId => <QuoteCard quote={this.state.quotes[quoteId]} key={quoteId}/>);
    return (
      <div className="primary-content multi-quote-view">
        <div className="quote-cards">
          {cards}
        </div>
      </div>
    )
  }

}