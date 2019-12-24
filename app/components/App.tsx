import * as React from "react";
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import {
  store,
  history,
} from '../data/setup-store';
import BoardView from '../containers/BoardViewPage';
import InfoSidebar from '../containers/InfoSidebar';
import Login from './Login';
import NavSidebar from '../containers/NavSidebar';
import Popup from '../containers/Popup'

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
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={BoardView} />
              <Route exact path="/boards/:id" component={BoardView} />
            </Switch>
            <InfoSidebar/>
          </ConnectedRouter>
        </Provider>
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
