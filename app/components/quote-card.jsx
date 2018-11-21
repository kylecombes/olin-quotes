import React from 'react';

export default class QuoteCard extends React.Component {

  render() {
    const text = this.props.quote.quote[0].text;

    return (
      <div className="quote-card">
        <span className="text">{text}</span>
        <div className="attributes">
          <img src={this.props.author.avatar} alt={this.props.author.first_name} />
          <span className="name">{this.props.author.first_name}</span>
        </div>
      </div>
    )
  }

}