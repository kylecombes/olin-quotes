import React from 'react';

export default class UserInfo extends React.Component {

  render() {
    const { user } = this.props;
    return user._id ?
      (
        <div className="user-info">
          <span>Welcome, {user.firstName}</span>
        </div>
      ) : (
        <div className="user-info">
          <button className="login" onClick={this.props.openLogin}>Log In</button>
        </div>
      );
  }

}