// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import { Store } from 'redux';
import * as io from 'socket.io-client';

import {
  IWebSocketMessagePayload,
} from './types';

let _store: Store;
let _socket: SocketIOClient.Socket;

type WS_EVENT_TYPE_LIST = {
  [key: string]: string
}

export const WS_EVENT_TYPES: WS_EVENT_TYPE_LIST = {
  CURRENT_USER_INFO: 'currentUserInfo',
  CHANGE_BOARD_MEMBER_ROLE: 'changeBoardMemberRole',
  BOARD_LIST_RECEIVED: 'boardList',
  BOARD_UPDATE: 'boardUpdate',
  PEOPLE_UPDATE: 'peopleUpdate',
  REMOVE_USER_FROM_BOARD: 'removeUserFromBoard',
  SINGLE_QUOTE_UPDATE: 'singleQuoteUpdate',
  SAVE_USER_INFO: 'saveUserInfo',
  SWITCH_TO_BOARD: 'switchToBoard',
  QUOTES_UPDATE: 'quotesUpdate',
  QUOTE_ADDED: 'quoteAdded',
  QUOTE_DELETED: 'quoteDeleted',
};

export const registerStore = (store: Store) => {
  _store = store;
};

export const connect = () => {
  // @ts-ignore
  _socket = io.connect(window.SERVER_URI, {
    secure: true,
  });
  _socket.on('connected', () => console.log('Connected to WebSockets server.'));
  Object.keys(WS_EVENT_TYPES).forEach(eventType => _socket.on(WS_EVENT_TYPES[eventType],
    (payload: IWebSocketMessagePayload) => _store.dispatch({ type: WS_EVENT_TYPES[eventType], data: payload })));
};

export const getSocket = () => _socket;

export const emit = (type: string, payload: IWebSocketMessagePayload) => _socket.emit(type, payload);
