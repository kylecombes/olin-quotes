import React from 'react';
import AddQuote from '../containers/AddQuote';
import Login from './Login';
import FinishAccountCreation from './FinishAccountCreation';
import CreateBoard from './CreateBoard';

export default class Popup extends React.Component {

  render() {
    let content = null;
    switch (this.props.type) {
      case 'login':
        content = <Login {...this.props}/>;
        break;
      case 'finishAccountCreation':
        content = <FinishAccountCreation {...this.props} />;
        break;
      case 'createBoard':
        content = <CreateBoard {...this.props} />;
        break;
      case 'addQuote':
        content = <AddQuote />;
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
