import React from 'react';
import LoginSignup from './login-signup';
import FinishAccountCreation from './finish-account-creation';

export default class Popup extends React.Component {

  render() {
    let content = null;
    switch (this.props.type) {
      case 'login':
        content = <LoginSignup {...this.props}/>;
        break;
      case 'finishAccountCreation':
        content = <FinishAccountCreation {...this.props} />;
        break;
    }

    const containerOnClick = this.props.isClosable ? this.props.close : null;

    return (
      <div className="popup-container" onClick={containerOnClick}>
        <div onClick={e => e.stopPropagation()}>
          {content}
        </div>
      </div>
    )
  }

}