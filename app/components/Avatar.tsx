import * as React from 'react';

import BlankAvatar from '../assets/blank-avatar.svg';

import { IPerson } from '../data/types';

type Props = {
  className?: string
  onClick?: (p: IPerson) => any
  user: IPerson
};

export default (props: Props) => {
  const {
    user,
  } = props;

  const onClick = () => {
    if (props.onClick) {
      props.onClick(user);
    }
  };

  const classNames = ['Avatar'];
  if (props.className) {
    classNames.push(props.className);
  }
  if (props.onClick) {
    classNames.push('clickable');
  }

  if (user && user.avatarUrl) {
    return <img className={classNames.join(' ')} src={user?.avatarUrl} onClick={onClick}/>;
  } else {
    return (
      <div className="Avatar blank-avatar" onClick={onClick}>
        <BlankAvatar/>
      </div>
    );
  }
};
