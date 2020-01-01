import * as React from 'react';

type Props = {
  commentCount: number
  className?: string
  onClick: () => any
};

const CommentIcon: React.FC<Props> = (props: Props) => {
  const classNames = 'comment-icon ' + (props.className || '');
  const tooltipText = 'Add and view comments';
  return (
    <div className={classNames} title={tooltipText}>
      <svg className="comment-icon" onClick={props.onClick} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 50 29.9">
        <path className="comment-icon-bubble-outline" d="M47.4 0h-28c1.4.6 2.8 1.5 3.9 2.6h24.1V18h-3.7l-7.9 6.5V18h-8.4c-.3.9-.7 1.8-1.1 2.6h6.9v9.3l11.4-9.3h2.7c1.4 0 2.6-1.2 2.6-2.6V2.6C50 1.2 48.8 0 47.4 0z"/>
        <g transform="translate(13.5, 13.5)">
          <circle className="comment-icon-circle" r="13.5"/>
          <text className="comment-icon-text" textAnchor="middle" dominantBaseline="central">{props.commentCount}</text>
        </g>
      </svg>
    </div>
  );
};

export default CommentIcon;
