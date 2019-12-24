import * as React from 'react';
import * as moment from 'moment';

import {
  IPerson,
  IQuoteComment,
} from '../data/types';

type Props = {
  author: IPerson
  comment: IQuoteComment
  deleteComment: () => any
  updateQuoteComment: (comment: IQuoteComment) => any
};

const Comment: React.FC<Props> = (props: Props) => {

  const {
    author,
    comment,
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
    return (
      <div className="comment">
        <p>{comment.content}</p>
        <p>- {author.displayName} on {moment(comment.added).format('MMM D, YYYY @ h:mm a')}</p>
        <p><span onClick={beginEditing}>Edit</span> <span onClick={props.deleteComment}>Delete</span></p>
      </div>
    );
  }
};

export default Comment;
