import * as React from 'react';

type Props = {
  className?: string
  liked: boolean
  onClick: () => any
};

export default (props: Props) => {
  const classNames = 'LikeIcon ' + (props.className || '') + (props.liked ? ' liked' : '');
  const tooltipText = props.liked ? 'Unlike' : 'Like';
  return (
    <div className={classNames} title={tooltipText}>
      <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.2 47.6">
        <path d="M27.1 9.3S38.9-6 49.7 8.1 31.3 45.5 27.1 45.5-6.3 22.1 4.5 8s22.6 1.3 22.6 1.3z"/>
      </svg>
    </div>
  );
};
