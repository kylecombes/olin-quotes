import React from 'react';
import LoginSignup from './login-signup';

export default class Popup extends React.Component {

  render() {
    let content = null;
    switch (this.props.type) {
      case 'login':
        content = <LoginSignup {...this.props}/>;
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