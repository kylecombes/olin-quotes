import * as React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import BoardViewPage from '../components/containers/BoardViewPage';
import BoardSettingsPage from '../components/pages/BoardSettingsPage';
import Login from './Login';
import NavSidebar from '../components/NavSidebar';
import PersonInfoPage from '../components/pages/PersonInfoPage';
import Modal from './Modal'
import QuoteInfoPage from '../components/pages/QuoteInfoPage';
import AddQuote from './containers/AddQuote';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

type State = {
  modal: ModalTypes
};

enum ModalTypes {
  NONE = 'NONE',
  ADD_QUOTE = 'ADD_QUOTE',
}

const initialState: State = {
  modal: ModalTypes.NONE,
};

const App = () => {
  const {
    data,
    loading,
    error,
  } = useQuery(IS_LOGGED_IN);

  const [state, setState] = React.useState(initialState);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
    return <p>An error occurred</p>;
  }

  if (!data.isLoggedIn) return <LoggedOutView/>;

  const addQuote = () => setState({...state, modal: ModalTypes.ADD_QUOTE});
  const closeModal = () => setState({...state, modal: ModalTypes.NONE});

  let modalChild;
  switch (state.modal) {
    case ModalTypes.ADD_QUOTE:
      modalChild = <AddQuote cancel={closeModal} />
  }
  let modal = modalChild ? <Modal close={closeModal}>{modalChild}</Modal> : null;

  // A bit hackish (needed to get both the 'addQuote' and the Router 'match' props)
  const BoardViewPageComponent = (props: any) => <BoardViewPage addQuote={addQuote} {...props} />;

  return (
    <div className="app">
      <div className="primary-container">
        <div className="content">
          <Router>
            <NavSidebar promptCreateBoard={() => {}} />
            <Switch>
              <Route exact path="/boards/:boardId" component={BoardViewPageComponent}/>
              <Route exact path="/boards/:boardId/settings" component={BoardSettingsPage}/>
              <Route exact path="/people/:personId" component={PersonInfoPage}/>
              <Route exact path="/quotes/:quoteId" component={QuoteInfoPage}/>
            </Switch>
          </Router>
        </div>
      </div>
      {modal}
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
