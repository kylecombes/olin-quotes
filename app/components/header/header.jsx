import React from 'react';

import UserInfo from './user-info';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header grid-x large-12">
        <span className="logo">Olin Quotes</span>
        <UserInfo {...this.props} />
      </div>
    )
  }

}
