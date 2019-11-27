import React from "react";
import InfoSidebar from '../containers/info-sidebar';
import MultiQuoteView from '../containers/multi-quote-view';
import NavSidebar from '../containers/nav-sidebar';
import Popup from '../containers/popup'

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.props.checkLoginStatus();
  }

  render() {
    return (
      <div className="app">
        {this.props.popupVisible && <Popup/>}
        <div className="primary-container">
          <div className="content">
            <NavSidebar/>
            <MultiQuoteView/>
            <InfoSidebar/>
          </div>
        </div>
      </div>
    );
  }
}
