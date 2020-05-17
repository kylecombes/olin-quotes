import * as React from 'react';
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
import BoardViewPage from '../containers/BoardViewPage';
import BoardSettingsPage from '../containers/BoardSettingsPage';
import Login from './Login';
import NavSidebar from '../containers/NavSidebar';
import PersonInfoPage from '../containers/PersonInfoPage';
import Popup from '../containers/Popup'
import QuoteInfoPage from '../containers/QuoteInfoPage';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface IProps {
  checkLoginStatus: () => null
  loggedIn: boolean
  popupVisible: boolean
}

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default (props: IProps) => {
  const {
    data,
    loading,
    error,
  } = useQuery(IS_LOGGED_IN);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
    return <p>An error occured</p>;
  }

  return data.isLoggedIn
    ? <LoggedInView {...props} />
    : <LoggedOutView {...props} />;
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
              <Route exact path="/boards/:id" component={BoardViewPage}/>
              <Route exact path="/boards/:id/settings" component={BoardSettingsPage}/>
              <Route exact path="/people/:id" component={PersonInfoPage}/>
              <Route exact path="/quotes/:id" component={QuoteInfoPage}/>
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    </div>
  </div>
);

const LoggedOutView = (props: IProps) => (
  <div className="app logged-out">
    <div className="centered-box-container">
      <Login />
    </div>
  </div>
);
