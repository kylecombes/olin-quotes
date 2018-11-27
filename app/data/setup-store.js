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
  init as websocketInit,
} from './websockets';
import * as reducers from './reducers';

export default function () {
  // Configure Redux
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  const initialState = {
    general: {
      debug: window.debug,
      isMobile,
      focusedPersonId: null,
    },
    infoSidebar: {
      sidebarType: null,
      elementId: null,
    },
    people: {},
    quotes: {},
  };

  const middleware = [
    thunkMiddleware.withExtraArgument({ emit }),
    // routeMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    // Only include the Redux devtools if they're installed and we're debugging
    (window.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? composeEnhancers(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

  // Give socket.io access to the data store
  websocketInit(store);

  return store;
}
