import * as React from 'react';
import * as moment from 'moment';

import AddComment from '../AddComment';
import {
  IQuote,
  IPerson,
} from '../../data/types';

type Props = {
  addComment: (quoteId: string, commentText: string) => any
  people: {
    [personId: string]: IPerson
  }
  quote: IQuote
  showPersonStats: (personId: string) => any
};

const QuoteInfo: React.FC<Props> = (props: Props) => {

  const quoteElement = props.quote.components.map(comp => {
    const speaker = props.people[comp.personId];
    return (
      <div className="quote-component" key={comp.content}>
        <img src={speaker.avatarUrl} title={speaker.displayName} onClick={() => props.showPersonStats(speaker._id)} />
        <div className="words">
          {comp.content}
        </div>
      </div>
    );
  });

  const comments = props.quote.comments ? props.quote.comments.map(comment => {
    const author = props.people[comment.authorId];
    return (
      <div className="comment">
        <p>{comment.content}</p>
        <p>- {author.displayName} on {moment(comment.added).format('MMM D, YYYY @ h:mm a')}</p>
      </div>
    );
  }) : <p className="no-comments">No comments</p>;

  const addComment = (commentText: string) => props.addComment(props.quote._id, commentText);

  return (
    <div className="quote-info">
      <h1 className="centered">Quote Details</h1>
      <div className="quote">
        {quoteElement}
      </div>
      <div className="quote-stats">
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {comments}
        <AddComment onSubmit={addComment}/>
      </div>
    </div>
  )

};

export default QuoteInfo;
