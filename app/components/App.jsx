import React from "react";
import InfoSidebar from '../containers/info-sidebar';
import Login from './Login';
import MultiQuoteView from '../containers/multi-quote-view';
import NavSidebar from '../containers/nav-sidebar';
import Popup from '../containers/popup'

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.props.checkLoginStatus();
  }

  render() {
    return this.props.loggedIn ? <LoggedInView {...this.props} /> : <LoggedOutView {...this.props} />;
  }
}

const LoggedInView = (props) => (
  <div className="app">
    {props.popupVisible && <Popup/>}
    <div className="primary-container">
      <div className="content">
        <NavSidebar/>
        <MultiQuoteView/>
        <InfoSidebar/>
      </div>
    </div>
  </div>
);

const LoggedOutView = (props) => (
  <div className="app logged-out">
    <div className="centered-box-container">
      <Login {...props} />
    </div>
  </div>
);
