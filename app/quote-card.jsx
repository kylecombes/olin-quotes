import React from 'react';

export default class QuoteCard extends React.Component {

  render() {
    return (
      <div className="quote-card">
        <span className="text">{this.props.quote.text}</span>
        <div className="attributes">
          <img src={this.props.quote.author.avatarUrl} alt={this.props.quote.author.name} />
          <span className="name">{this.props.quote.author.name}</span>
        </div>
      </div>
    )
  }

}