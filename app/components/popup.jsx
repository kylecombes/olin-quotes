import React from 'react';
import LoginSignup from './login-signup';
import CreateAccount from './create-account';

export default class Popup extends React.Component {

  render() {
    let content = null;
    switch (this.props.type) {
      case 'login':
        content = <LoginSignup {...this.props}/>;
        break;
      case 'createAccount':
        content = <CreateAccount {...this.props} />;
        break;
    }

    return (
      <div className="popup-container" onClick={this.props.close}>
        <div onClick={e => e.stopPropagation()}>
          {content}
        </div>
      </div>
    )
  }

}