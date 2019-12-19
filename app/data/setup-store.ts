/* eslint-disable no-underscore-dangle */
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

export default function () {
  const middleware = [
    thunkMiddleware.withExtraArgument({ emit }),
    // routeMiddleware,
  ];

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({ ...reducers }),
    {},
    // Only include the Redux devtools if they're installed and we're debugging
    // @ts-ignore
    (window.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? composeEnhancers(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

  // Give socket.io access to the data store
  websocketRegisterStore(store);

  return store;
}
