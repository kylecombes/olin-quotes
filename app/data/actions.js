/* This file contains all of the Redux actions. */

import axios from 'axios';

import {
  connect as websocketConnect,
  WS_EVENT_TYPES,
} from './websockets';

export const ActionTypes = {
  ADD_QUOTE: 'addQuote',
  ADD_BOARD: 'addBoard',
  ADD_QUOTE_COMMENT: 'addQuoteComment',
  CLOSE_POPUP: 'CLOSE_POPUP',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  OPEN_POPUP: 'OPEN_POPUP',
  SHOW_PERSON_STATS: 'SHOW_PERSON_STATS',
  SHOW_QUOTE_INFO: 'SHOW_QUOTE_INFO',
  MASONRY_RECALCULATE_LAYOUT: 'MASONRY_RECALCULATE_LAYOUT',
};

let _axioInstance = axios.create({
  baseURL: window.SERVER_URI,
  withCredentials: true,
});

function makeApiRequest(endpoint, data) {
  try {
    if (data) {
      return _axioInstance.post(data)
        .then(res => res.data);
    } else {
      return _axioInstance.get(endpoint)
        .then(res => res.data);
    }
  } catch (e) {
    console.error(e);
  }
}

export function addBoard(boardInfo) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_BOARD, boardInfo);
    dispatch(closePopup());
  }
}

export function addQuote(quoteData) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_QUOTE, quoteData);
  }
}

export function addQuoteComment(quoteId, text) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_QUOTE_COMMENT, {
      quoteId,
      text,
    });
  }
}

export function checkLoginStatus() {
  return () => {
    return makeApiRequest('/loginStatus')
      .then(res => {
        if (res.loggedIn) {
          websocketConnect();
        }
      });
  };
}

export function showQuoteInfo(quoteId) {
  return dispatch => {
    dispatch({type: ActionTypes.SHOW_QUOTE_INFO, data: quoteId});
    dispatch(masonryRecalculateLayout());
  }
}

export function showPersonStats(personId) {
  return dispatch => {
    dispatch({type: ActionTypes.SHOW_PERSON_STATS, data: personId});
    dispatch(masonryRecalculateLayout());
  }
}

export function openLogin() {
  return { type: ActionTypes.OPEN_POPUP, data: 'login' };
}

export function promptCreateBoard() {
  return { type: ActionTypes.OPEN_POPUP, data: 'createBoard' };
}

export function closePopup() {
  return { type: ActionTypes.CLOSE_POPUP };
}

export function closeSidebar() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLOSE_SIDEBAR });
    dispatch(masonryRecalculateLayout());
  }
}

export function masonryRecalculateLayout() {
  return { type: ActionTypes.MASONRY_RECALCULATE_LAYOUT };
}

export function saveUserInfo(userData) {
  return (dispatch, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.SAVE_USER_INFO, userData);
  }
}
