import * as React from "react";
import BoardView from '../containers/BoardView';
// @ts-ignore
import InfoSidebar from '../containers/info-sidebar';
// @ts-ignore
import Login from './Login';
// @ts-ignore
import NavSidebar from '../containers/nav-sidebar';
// @ts-ignore
import Popup from '../containers/popup'

interface IProps {
  checkLoginStatus: () => null
  loggedIn: boolean
  popupVisible: boolean
}

export default class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    props.checkLoginStatus();
  }

  render() {
    return this.props.loggedIn ? <LoggedInView {...this.props} /> : <LoggedOutView {...this.props} />;
  }
}

const LoggedInView = (props: IProps) => (
  <div className="app">
    {props.popupVisible && <Popup/>}
    <div className="primary-container">
      <div className="content">
        <NavSidebar/>
        <BoardView/>
        <InfoSidebar/>
      </div>
    </div>
  </div>
);

const LoggedOutView = (props: IProps) => (
  <div className="app logged-out">
    <div className="centered-box-container">
      <Login {...props} />
    </div>
  </div>
);
