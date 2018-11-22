import React from 'react';

export default class QuoteCard extends React.Component {

  render() {
    const { words } = this.props.quote.components[0];

    return (
      <div className="quote-card">
        <span className="text">{words}</span>
        <div className="attributes">
          <img src={this.props.author.avatarUrl} alt={this.props.author.displayName} />
          <span className="name">{this.props.author.displayName}</span>
        </div>
      </div>
    )
  }

}