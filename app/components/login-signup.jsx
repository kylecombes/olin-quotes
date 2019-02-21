import React from 'react';
import OAuth from './oauth';

export default class LoginSignup extends React.Component {

  render() {
    return (
      <div className="login-signup">
        <OAuth provider="google" socket={this.props.socket} server={this.props.server}/>
        <OAuth provider="facebook" socket={this.props.socket} server={this.props.server}/>
      </div>
    )
  }

}