import React from 'react';

export default class QuoteCard extends React.Component {

  render() {
    let content = [];
    let authorInfo = [];
    if (this.props.quote.components.length === 1) {
      const {personId, words} = this.props.quote.components[0];
      const person = this.props.people[personId];
      content.push(<span className="words">{words}</span>);
      authorInfo.push(
        <div className="author-info" key={words}>
          <img
            src={person.avatarUrl}
            title={person.displayName}
            onClick={() => this.props.showPersonStats(personId)}
          />
          <span className="author-name" onClick={() => this.props.showPersonStats(personId)}>{person.displayName}</span>
        </div>
      );
    } else {
      let authors = {};
      this.props.quote.components.forEach(quoteComp => {
        const {personId, words} = quoteComp;
        const person = this.props.people[personId];
        content.push(
          <div className="quote-component" key={words}>
            <img src={person.avatarUrl} title={person.displayName} onClick={() => this.props.showPersonStats(person._id)} />
            <div className="words">
              {words}
            </div>
          </div>
        );
        authors[personId] = (
          <span
            className="author-name"
            onClick={() => this.props.showPersonStats(person._id)}
            key={person._id}
          >
            {person.displayName}
          </span>
        );
        authorInfo = Object.values(authors);
      });
    }

    return (
      <div className="quote-card" onClick={this.props.onClick}>
        {content}
        <div className="attributes">
          {authorInfo}
        </div>
      </div>
    )
  }

}