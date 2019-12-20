/* eslint-disable no-underscore-dangle */
import {
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  emit,
  registerStore as websocketRegisterStore,
} from './websockets';
import * as reducers from './reducers';

export const history = createBrowserHistory();

const router = connectRouter(history);

const middleware = [
  thunkMiddleware.withExtraArgument({ emit }),
  routerMiddleware(history), // For dispatching history actions
];

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({ ...reducers, router }),
  {},
  // Only include the Redux devtools if they're installed and we're debugging
  // @ts-ignore
  (window.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware),
);

// Give socket.io access to the data store
websocketRegisterStore(store);
