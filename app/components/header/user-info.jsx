import React from 'react';

export default class UserInfo extends React.Component {

  render() {
    return (
      <div className="user-info">
        <button className="login" onClick={this.props.openLogin}>Log In</button>
      </div>
    )
  }

}