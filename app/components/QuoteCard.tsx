import * as React from 'react';
import {
  IPerson,
  IQuote,
} from '../data/types';

type Props = {
  onClick: () => any
  people: {
    [personId: string]: IPerson
  }
  quote: IQuote
  showPersonStats: (personId: string) => any
};

export default class QuoteCard extends React.Component<Props> {

  render() {
    let contentElems = [];
    let authorInfoElems = [];
    if (this.props.quote.components.length === 1) {
      const {personId, content} = this.props.quote.components[0];
      const person = this.props.people[personId];
      contentElems.push(<span className="words">{content}</span>);
      const showPersonStats = () => this.props.showPersonStats(personId);
      authorInfoElems.push(
        <div className="author-info" key={content}>
          <img
            src={person.avatarUrl}
            title={person.displayName}
            onClick={showPersonStats}
          />
          <span className="author-name" onClick={() => this.props.showPersonStats(personId)}>{person.displayName}</span>
        </div>
      );
    } else {
      let authorIds: Set<string> = new Set();
      this.props.quote.components.forEach(quoteComp => {
        const {personId, content} = quoteComp;
        const person = this.props.people[personId];
        contentElems.push(
          <div className="quote-component" key={content}>
            <img src={person.avatarUrl} title={person.displayName} onClick={() => this.props.showPersonStats(person._id)} />
            <div className="words">
              {content}
            </div>
          </div>
        );
        if (!authorIds.has(personId)) {
          authorInfoElems.push(
            <span
              className="author-name"
              onClick={() => this.props.showPersonStats(person._id)}
              key={person._id}
            >
            {person.displayName}
          </span>
          );
          authorIds.add(personId);
        }
      });
    }

    return (
      <div className="quote-card">
        {contentElems}
        <div className="attributes">
          {authorInfoElems} | <span onClick={this.props.onClick}>Info</span>
        </div>
      </div>
    )
  }

}
