import * as React from 'react';

import AddComment from '../AddComment';
import Comment from '../Comment';
import {
  IQuote,
  IPerson,
  IQuoteComment,
} from '../../data/types';

type Props = {
  addComment: (quoteId: string, commentText: string) => any
  deleteComment: (comment: IQuoteComment) => any
  people: {
    [personId: string]: IPerson
  }
  quote: IQuote
  updateQuoteComment: (comment: IQuoteComment) => any
  showPersonStats: (personId: string) => any
  toggleCommentLike: (comment: IQuoteComment) => any
  userId: string
};

const QuoteInfoPage: React.FC<Props> = (props: Props) => {

  if (!props.quote || Object.keys(props.people).length === 0) {
    return null;
  }

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
    const deleteComment = () => props.deleteComment(comment);
    const toggleCommentLike = () => props.toggleCommentLike(comment);
    return <Comment
      author={author}
      comment={comment}
      deleteComment={deleteComment}
      toggleCommentLike={toggleCommentLike}
      updateQuoteComment={props.updateQuoteComment}
      userId={props.userId}
    />;
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

export default QuoteInfoPage;
