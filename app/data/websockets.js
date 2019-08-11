// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import io from 'socket.io-client';

let _store;
let _socket;

export const WS_EVENT_TYPES = {
  CURRENT_USER_INFO: 'currentUserInfo',
  BOARD_LIST_RECEIVED: 'boardList',
  PEOPLE_UPDATE: 'peopleUpdate',
  SINGLE_QUOTE_UPDATE: 'singleQuoteUpdate',
  SAVE_USER_INFO: 'saveUserInfo',
  SWITCH_TO_BOARD: 'switchToBoard',
  QUOTES_UPDATE: 'quotesUpdate',
  QUOTE_ADDED: 'quoteAdded',
  QUOTE_DELETED: 'quoteDeleted',
};

export const registerStore = store => {
  _store = store;
};

export const connect = () => {
  _socket = io.connect(window.SERVER_URI, {
    secure: true,
  });
  _socket.on('connected', () => console.log('Connected to WebSockets server.'));
  Object.keys(WS_EVENT_TYPES).forEach(eventType => _socket.on(WS_EVENT_TYPES[eventType],
    payload => _store.dispatch({ type: WS_EVENT_TYPES[eventType], data: payload })));
};

export const getSocket = () => _socket;

export const emit = (type, payload) => _socket.emit(type, payload);
