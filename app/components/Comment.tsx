import * as React from 'react';
import * as moment from 'moment';

import {
  IPerson,
  IQuoteComment,
} from '../data/types';
import {
  indexOf,
} from '../utils';

type Props = {
  author: IPerson
  comment: IQuoteComment
  toggleCommentLike: () => any
  deleteComment: () => any
  updateQuoteComment: (comment: IQuoteComment) => any
  userId: string
};

const Comment: React.FC<Props> = (props: Props) => {

  const {
    author,
    comment,
    userId,
  } = props;

  const initialState = {
    content: comment.content,
    editing: false,
  };
  const [state, setState] = React.useState(initialState);

  if (state.editing) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setState({...state, content: e.target.value});
    const discard = () => setState(initialState);
    const save = () => {
      props.updateQuoteComment({...comment, content: state.content});
      setState(initialState);
    };
    return (
      <div className="comment editing">
        <input type="text" value={state.content} onChange={onChange}/>
        <button className="button" onClick={discard}>Discard</button>
        <button className="button" onClick={save}>Save</button>
      </div>
    )
  } else {
    const beginEditing = () => setState({content: props.comment.content, editing: true});
    const userLiked = indexOf(comment.likes, l => l.personId === userId) >= 0;
    const adminButtons = comment.authorId === userId ? [
      <span>&nbsp;</span>,
      <span onClick={beginEditing}>Edit</span>,
      <span>&nbsp;</span>,
      <span onClick={props.deleteComment}>Delete</span>,
    ] : null;
    return (
      <div className="comment">
        <p>{comment.content}</p>
        <p>- {author.displayName} on {moment(comment.added).format('MMM D, YYYY @ h:mm a')}</p>
        <p>
          <span onClick={props.toggleCommentLike}>{userLiked ? 'Unlike' : 'Like'}</span>
          {adminButtons}
        </p>
      </div>
    );
  }
};

export default Comment;
