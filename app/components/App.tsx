import * as React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

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

interface IProps {
  checkLoginStatus: () => null
  loggedIn: boolean
  popupVisible: boolean
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

export default class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    props.checkLoginStatus();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.props.loggedIn ? <LoggedInView {...this.props} /> : <LoggedOutView {...this.props} />}
      </ApolloProvider>
    );
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
