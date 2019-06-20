// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import io from 'socket.io-client';

let _store;

export const WS_EVENT_TYPES = {
  CURRENT_USER_INFO: 'currentUserInfo',
  PEOPLE_UPDATE: 'peopleUpdate',
  SINGLE_QUOTE_UPDATE: 'singleQuoteUpdate',
  SAVE_USER_INFO: 'saveUserInfo',
  QUOTES_UPDATE: 'quotesUpdate',
  QUOTE_ADDED: 'quoteAdded',
  QUOTE_DELETED: 'quoteDeleted',
};

export const registerStore = store => {
  _store = store;
};

export const connect = () => {
  const socket = io.connect(window.SERVER_URI, {
    secure: true,
  });
  socket.on('connected', () => console.log('Connected to WebSockets server.'));
  Object.keys(WS_EVENT_TYPES).forEach(eventType => socket.on(WS_EVENT_TYPES[eventType],
    payload => _store.dispatch({ type: WS_EVENT_TYPES[eventType], data: payload })));
};

export const emit = (type, payload) => socket.emit(type, payload);
