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

  return (
    <div className="comment">
      <p>{comment.content}</p>
      <p>- {author.displayName} on {moment(comment.added).format('MMM D, YYYY @ h:mm a')}</p>
      <p><span onClick={props.deleteComment}>Delete</span> <span>Edit</span></p>
    </div>
  );
};

export default Comment;
