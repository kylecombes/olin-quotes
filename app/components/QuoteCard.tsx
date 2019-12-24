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
  showQuoteInfo: (quote: IQuote) => any
};

export default class QuoteCard extends React.Component<Props> {

  render() {
    let contentElements: React.ReactElement[] = [];
    const buttons = (
      <div className="buttons-container">
        (Like) (Comments)
      </div>
    );
    const showQuoteInfo = () => this.props.showQuoteInfo(this.props.quote);
    this.props.quote.components.forEach((quoteComp) => {
      const {
        personId,
        content,
      } = quoteComp;
      const person = this.props.people[personId];
      const showPersonStats = () => this.props.showPersonStats(personId);
      contentElements.push(
        <div className="words" onClick={showQuoteInfo}>
          {content}
        </div>
      );
      contentElements.push(
        <div className="attributes">
          <img className="triangle" src="/assets/triangle.svg" />
          <div className="author-info" key={content}>
            <img
              className="avatar"
              src={person?.avatarUrl}
              title={person?.displayName}
              onClick={showPersonStats}
            />
            <span className="author-name" onClick={showPersonStats}>{person?.displayName}</span>
            {this.props.quote.components.length === 1 && buttons}
          </div>
        </div>
      );
    });

    if (this.props.quote.components.length > 1) {
      contentElements.push(
        <div className="quote-card-footer">
          {buttons}
        </div>
      );
    }

    return (
      <div className="quote-card">
        {contentElements}
      </div>
    )
  }

}
