import * as React from 'react';
import * as moment from 'moment';

import {
  IPerson,
  IQuoteComment,
} from '../data/types';
import {
  userLikedItem,
} from '../utils';

import LikeIcon from './LikeIcon';

type Props = {
  author: IPerson
  comment: IQuoteComment
  toggleCommentLike: () => any
  deleteComment: () => any
  showAuthorPage: () => any
  updateQuoteComment: (comment: IQuoteComment) => any
  user: IPerson
};

const Comment: React.FC<Props> = (props: Props) => {

  const {
    author,
    comment,
    showAuthorPage,
    user,
  } = props;

  const initialState = {
    content: comment.content,
    editing: false,
  };
  const [state, setState] = React.useState(initialState);
  const beginEditing = () => setState({content: props.comment.content, editing: true});
  const userLiked = userLikedItem(comment, user);
  const buttons = comment.authorId === user._id ? [
    <span onClick={beginEditing}>Edit</span>,
    <span>&nbsp;</span>,
    <span onClick={props.deleteComment}>Delete</span>,
  ] : (
    <LikeIcon onClick={props.toggleCommentLike} liked={userLiked} />
  );
  const dateText = moment(comment.added).format('MMM D, YYYY @ h:mm a');
  let body;

  if (state.editing) {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setState({...state, content: e.target.value});
    const discard = () => setState(initialState);
    const save = () => {
      props.updateQuoteComment({...comment, content: state.content});
      setState(initialState);
    };
    body = (
      <div className="comment-body editing">
        <textarea value={state.content} onChange={onChange}/>
        <div className="buttons">
          <button className="button" onClick={discard}>Discard</button>
          <button className="button" onClick={save}>Save</button>
        </div>
      </div>
    );
  } else {
    body = (
      <div className="comment-body">
        <div className="content">
          {comment.content}
        </div>
        <div className="buttons">
          {buttons}
        </div>
      </div>
    );
  }
  return (
    <div className="Comment">
      <div className="comment-header">
        <div className="author">
          <img src={author.avatarUrl} className="avatar" alt={author.displayName} onClick={showAuthorPage} />
          <span className="name" onClick={showAuthorPage}>{author.displayName}</span>
        </div>
        <span className="date">{dateText}</span>
      </div>
      {body}
    </div>
  );
};

export default Comment;
