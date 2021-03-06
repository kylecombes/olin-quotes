import * as React from 'react';
import * as moment from 'moment';

import {
  IQuote,
  IPerson,
  IQuoteComment,
  ILike,
} from '../../data/types';

import AddComment from '../AddComment';
import Comment from '../Comment';
import InfoSection from '../InfoSection';
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

  const likesText = getLikesText(quote.likes, people, showPersonStats);

  const comments = props.quote.comments ? props.quote.comments.map(comment => {
    const author = props.people[comment.authorId];
    const deleteComment = () => props.deleteComment(comment);
    const toggleCommentLike = () => props.toggleCommentLike(comment);
    const showAuthorPage = () => showPersonStats(comment.authorId);
    return <Comment
      author={author}
      comment={comment}
      deleteComment={deleteComment}
      showAuthorPage={showAuthorPage}
      toggleCommentLike={toggleCommentLike}
      updateQuoteComment={props.updateQuoteComment}
      user={props.user}
    />;
  }) : <p className="no-comments">No comments</p>;

  const showAuthorPage = () => showPersonStats(quote.addedBy);
  const addComment = (commentText: string) => props.addComment(props.quote._id, commentText);
  const toggleQuoteLike = () => props.toggleQuoteLike(quote);

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
          Added by <span className="author-name" onClick={showAuthorPage}>{people[quote.addedBy].displayName}</span> on {moment(quote.addDate).format('MMM D, YYYY @ h:mm a')}.
        </div>
      </div>
      <div>
        <InfoSection title="Likes" className="likes">
          {likesText}
        </InfoSection>
        <InfoSection title="Comments" className="comments">
          {comments}
          <AddComment onSubmit={addComment}/>
        </InfoSection>
      </div>
    </div>
  );
};

const getLikesText = (likes: ILike[], people: {[pid: string]: IPerson}, showPersonStats: (pid: string) => any) => {
  const numLikes = likes?.length || 0;
  let likesText;
  if (numLikes > 0) {
    const recentCount = 5;
    const recentLikes = likes?.slice(-recentCount);
    const names = recentLikes.reverse().map(like => {
      const viewPerson = () => showPersonStats(like.personId);
      return <span className="person-name" onClick={viewPerson}>{people[like.personId].displayName}</span>;
    });
    if (numLikes === 1) {
      likesText = [names[0], <span> likes this quote.</span>];
    } else if (numLikes <= names.length) {
      likesText = [];
      names.forEach((nameSpan, idx) => {
        likesText.push(nameSpan);
        if (idx < names.length-2) {
          likesText.push(<span className="separator">, </span>);
        } else if (idx === names.length-2) {
          likesText.push(<span className="separator"> & </span>);
        }
      });
      likesText.push(<span className="suffix"> like this quote.</span>);
    } else {
      likesText = [];
      names.forEach((nameSpan, idx) => {
        likesText.push(nameSpan);
        if (idx !== names.length-1) {
          likesText.push(<span className="separator">, </span>);
        }
      });
      likesText.push(<span className="suffix"> & {numLikes-recentCount} others like this quote.</span>);
    }
  } else {
    likesText = 'Nobody has liked this quote yet.';
  }
  return likesText;
};

export default QuoteInfoPage;
