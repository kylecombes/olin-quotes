import React from 'react';
import OAuth from './oauth';

export default class LoginSignup extends React.Component {

  render() {
    return (
      <div className="login-signup">
        <OAuth
          provider="google"
          label="Log in with Google"
          {...this.props}
        />
        <OAuth
          provider="facebook"
          label="Log in with Facebook"
          {...this.props}
        />
      </div>
    )
  }

}