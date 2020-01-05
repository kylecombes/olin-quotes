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

  return (
    <object
      className={classNames.join(' ')}
      data={user?.avatarUrl}
      onClick={onClick}
      type="image/jpeg"
    >
      <BlankAvatar/>
    </object>
  );
};
