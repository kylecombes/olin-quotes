/* This file contains all of the Redux actions. */

import axios from 'axios'
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  IBoard,
  IQuote, IUser,
} from './types';
import {
  connect as websocketConnect,
  WS_EVENT_TYPES,
  // @ts-ignore
} from './websockets';

export const ActionTypes = {
  ADD_QUOTE: 'addQuote',
  ADD_BOARD: 'addBoard',
  ADD_QUOTE_COMMENT: 'addQuoteComment',
  CLOSE_POPUP: 'CLOSE_POPUP',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  OPEN_POPUP: 'OPEN_POPUP',
  SWITCH_TO_BOARD: 'SWITCH_TO_BOARD',
  SHOW_ADD_QUOTE_MODAL: 'SHOW_ADD_QUOTE_MODAL',
  SHOW_PERSON_STATS: 'SHOW_PERSON_STATS',
  SHOW_QUOTE_INFO: 'SHOW_QUOTE_INFO',
  MASONRY_RECALCULATE_LAYOUT: 'MASONRY_RECALCULATE_LAYOUT',
};

let _axioInstance = axios.create({
  // @ts-ignore
  baseURL: window.SERVER_URI,
  withCredentials: true,
});

// TODO: Replace data: any with something better
function makeApiRequest(endpoint: string, data?: any) {
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

export function addBoard(boardInfo: IBoard) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(ActionTypes.ADD_BOARD, boardInfo);
    dispatch(closePopup());
  }
}

export function addQuote(quoteData: IQuote) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    const state = getStore();
    quoteData.boardId = state.boards.current._id;
    emit(ActionTypes.ADD_QUOTE, quoteData);
  }
}

export function addQuoteComment(quoteId: string, text: string) {
  // @ts-ignore
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
      // @ts-ignore
      .then(res => {
        if (res.loggedIn) {
          websocketConnect();
        }
      });
  };
}

export function switchToBoard(board: IBoard) {
  return { type: ActionTypes.SWITCH_TO_BOARD, data: board };
}

export function showAddQuoteModal() {
  return { type: ActionTypes.OPEN_POPUP, data: 'addQuote' };
}

export function showQuoteInfo(quoteId: string) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: ActionTypes.SHOW_QUOTE_INFO, data: quoteId});
    dispatch(masonryRecalculateLayout());
  }
}

export function showPersonStats(personId: string) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: ActionTypes.CLOSE_SIDEBAR });
    dispatch(masonryRecalculateLayout());
  }
}

export function masonryRecalculateLayout() {
  return { type: ActionTypes.MASONRY_RECALCULATE_LAYOUT };
}

export function saveUserInfo(userData: IUser) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.SAVE_USER_INFO, userData);
  }
}
