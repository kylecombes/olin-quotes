import * as React from 'react';
import {
  IPerson,
  IQuote,
} from '../data/types';
import CommentIcon from './CommentIcon';
import LikeIcon from './LikeIcon';

type Props = {
  onClick?: () => any
  people: {
    [personId: string]: IPerson
  }
  quote: IQuote
  hideCommentsButton?: boolean
  showPersonStats: (personId: string) => any
  showQuoteInfo?: (quote: IQuote) => any
  toggleQuoteLike: () => any
  userLikedQuote: boolean
};

export default (props: Props) => {
  const {
    hideCommentsButton = false,
    people,
    quote,
    showPersonStats,
    showQuoteInfo,
    toggleQuoteLike,
    userLikedQuote,
  } = props;
  let contentElements: React.ReactElement[] = [];
  const showInfo = () => showQuoteInfo(quote);
  const commentCount = quote.comments.length;
  const buttons = (
    <div className="buttons-container">
      <LikeIcon liked={userLikedQuote} onClick={toggleQuoteLike}/>
      {!hideCommentsButton && <CommentIcon commentCount={commentCount} onClick={showInfo}/>}
    </div>
  );
  quote.components.forEach((quoteComp) => {
    const {
      personId,
      content,
    } = quoteComp;
    const person = people[personId];
    const viewPerson = () => showPersonStats(personId);
    contentElements.push(
      <div className="words" onClick={showInfo}>
        {content}
      </div>
    );
    contentElements.push(
      <div className="attributes">
        <div className="attribution">
          <img className="triangle" src="/assets/triangle.svg" />
          <div className="author-info" key={content}>
            <img
              className="avatar"
              src={person?.avatarUrl}
              title={person?.displayName}
              onClick={viewPerson}
            />
            <span className="author-name" onClick={viewPerson}>{person?.displayName}</span>
          </div>
        </div>
        {quote.components.length === 1 && buttons}
      </div>
    );
  });

  if (quote.components.length > 1) {
    contentElements.push(
      <div className="quote-card-footer">
        {buttons}
      </div>
    );
  }

  return (
    <div className="QuoteCard">
      {contentElements}
    </div>
  );

}
