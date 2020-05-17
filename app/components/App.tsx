import * as React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getCurrentBoardId } from '../utils';

import BoardViewPage from '../components/pages/BoardViewPage';
import BoardSettingsPage from '../components/pages/BoardSettingsPage';
import Login from './Login';
import NavSidebar from '../components/NavSidebar';
import PersonInfoPage from '../components/pages/PersonInfoPage';
import Popup from '../components/Popup'
import QuoteInfoPage from '../components/pages/QuoteInfoPage';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
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
    return <p>An error occurred</p>;
  }

  if (!data.isLoggedIn) return <LoggedOutView/>;

  const currentBoardId = getCurrentBoardId();

  return (
    <div className="app">
      {/*{props.popupVisible && <Popup/>}*/}
      <div className="primary-container">
        <div className="content">
          <NavSidebar
            currentBoardId={currentBoardId}
            promptCreateBoard={() => {
            }}
          />
          <Router>
            <Switch>
              <Route exact path="/boards/:id" component={BoardViewPage}/>
              <Route exact path="/boards/:id/settings" component={BoardSettingsPage}/>
              <Route exact path="/people/:id" component={PersonInfoPage}/>
              <Route exact path="/quotes/:id" component={QuoteInfoPage}/>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

const LoggedOutView: React.FC = () => (
  <div className="app logged-out">
    <div className="centered-box-container">
      <Login />
    </div>
  </div>
);

export default App;
