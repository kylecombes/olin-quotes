// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import io from 'socket.io-client';

export const socket = io.connect(window.SERVER_URI);

export const WS_EVENT_TYPES = {
  CREATE_ACCOUNT: 'createUserAccount',
  PEOPLE_UPDATE: 'peopleUpdate',
  SINGLE_QUOTE_UPDATE: 'singleQuoteUpdate',
  PROMPT_ACCOUNT_CREATION: 'promptAccountCreation',
  QUOTES_UPDATE: 'quotesUpdate',
  QUOTE_ADDED: 'quoteAdded',
  QUOTE_DELETED: 'quoteDeleted',
};

export const init = (store) => {
  Object.keys(WS_EVENT_TYPES).forEach(eventType => socket.on(WS_EVENT_TYPES[eventType],
    payload => store.dispatch({ type: WS_EVENT_TYPES[eventType], data: payload })));
};

export const emit = (type, payload) => socket.emit(type, payload);
