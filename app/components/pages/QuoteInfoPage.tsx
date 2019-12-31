import * as React from 'react';

import AddComment from '../AddComment';
import Comment from '../Comment';
import {
  IQuote,
  IPerson,
  IQuoteComment,
} from '../../data/types';
import QuoteCard from '../QuoteCard';

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
  toggleQuoteLike: (quote: IQuote) => any
  user: IPerson
  userLikedQuote: boolean
};

const QuoteInfoPage: React.FC<Props> = (props: Props) => {
  const {
    people,
    quote,
    showPersonStats,
    userLikedQuote,
  } = props;

  if (!props.quote || Object.keys(props.people).length === 0) {
    return null;
  }

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
      user={props.user}
    />;
  }) : <p className="no-comments">No comments</p>;

  const addComment = (commentText: string) => props.addComment(props.quote._id, commentText);
  const toggleQuoteLike = () => props.toggleQuoteLike(quote);
  const likeCount = quote.likes?.length || 0;

  return (
    <div className="QuoteInfoPage primary-content split-page-2">
      <div>
        <QuoteCard
          hideCommentsButton={true}
          people={people}
          quote={quote}
          showPersonStats={showPersonStats}
          toggleQuoteLike={toggleQuoteLike}
          userLikedQuote={userLikedQuote}
          />
        <div className="quote-stats">
        </div>
      </div>
      <div>
        <InfoSection title="Likes">
          {likeCount} {likeCount === 1 ? 'person likes' : 'people like'} this quote.
        </InfoSection>
        <InfoSection title="Comments" className="comments">
          {comments}
          <AddComment onSubmit={addComment}/>
        </InfoSection>
      </div>
    </div>
  );
};

type InfoSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
};

const InfoSection: React.FC<InfoSectionProps> = (props: InfoSectionProps) => (
  <div className={'InfoSection ' + (props.className || '')}>
    <h1 className="info-section-header">{props.title}</h1>
    {props.children}
  </div>
);

export default QuoteInfoPage;
