/* This file contains all of the Redux actions. */

import axios from 'axios'
import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';

import {
  IBoard,
  IQuote,
  IPerson,
  INewBoard,
  IRootState,
  IQuoteComment,
  IBoardMemberRole,
} from './types';
import {
  getCurrentBoardId,
} from '../utils';
import {
  connect as websocketConnect,
  WS_EVENT_TYPES,
} from './websockets';

export const ActionTypes = {
  ADD_QUOTE: 'addQuote',
  ADD_BOARD: 'addBoard',
  ADD_BOARD_MEMBER: 'addBoardMember',
  ADD_QUOTE_COMMENT: 'addQuoteComment',
  CLOSE_POPUP: 'CLOSE_POPUP',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  DELETE_QUOTE_COMMENT: 'deleteQuoteComment',
  TOGGLE_QUOTE_LIKE: 'toggleQuoteLike',
  LIKE_UNLIKE_QUOTE_COMMENT: 'toggleCommentLike',
  OPEN_POPUP: 'OPEN_POPUP',
  SWITCH_TO_BOARD: 'SWITCH_TO_BOARD',
  SHOW_ADD_QUOTE_MODAL: 'SHOW_ADD_QUOTE_MODAL',
  SHOW_PERSON_STATS: 'SHOW_PERSON_STATS',
  SHOW_QUOTE_INFO: 'SHOW_QUOTE_INFO',
  MASONRY_RECALCULATE_LAYOUT: 'MASONRY_RECALCULATE_LAYOUT',
  UPDATE_QUOTE_COMMENT: 'updateQuoteComment',
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

export function addBoard(boardInfo: INewBoard) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(ActionTypes.ADD_BOARD, boardInfo);
    dispatch(closePopup());
  }
}

export function addBoardMember(board: IBoard, person: IPerson, role: IBoardMemberRole) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(ActionTypes.ADD_BOARD_MEMBER, {
      boardId: board._id,
      personId: person._id,
      role,
    });
  };
}

export function changeBoardMemberRole(board: IBoard, person: IPerson, role: IBoardMemberRole) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.CHANGE_BOARD_MEMBER_ROLE, {
      boardId: board._id,
      personId: person._id,
      role,
    });
  };
}

export function removeBoardMember(board: IBoard, person: IPerson) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.REMOVE_USER_FROM_BOARD, {
      boardId: board._id,
      personId: person._id,
    });
  };
}

export function renameBoard(board: IBoard, newName: string) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.RENAME_BOARD, {
      boardId: board._id,
      name: newName,
    });
  };
}

export function addQuote(quoteData: IQuote) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    const state: IRootState = getStore();
    const currentBoardId = getCurrentBoardId();
    if (!currentBoardId) {
      console.error('addQuote: Could not resolve current board ID from URL.');
      return;
    }
    quoteData.boardId = currentBoardId;
    emit(ActionTypes.ADD_QUOTE, quoteData);
  }
}

export function toggleQuoteLike(quote: IQuote) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.TOGGLE_QUOTE_LIKE, {
      id: quote._id,
    });
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

export function toggleQuoteCommentLike(comment: IQuoteComment) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.LIKE_UNLIKE_QUOTE_COMMENT, {
      id: comment._id,
    });
  }
}

export function deleteQuoteComment(comment: IQuoteComment) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.DELETE_QUOTE_COMMENT, {
      id: comment._id,
    });
  }
}

export function updateQuoteComment(comment: IQuoteComment) {
  // @ts-ignore
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.UPDATE_QUOTE_COMMENT, {
      id: comment._id,
      content: comment.content,
    });
  }
}


export function checkLoginStatus() {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    return makeApiRequest('/loginStatus')
      // @ts-ignore
      .then(res => {
        if (res.loggedIn) {
          websocketConnect();
        } else {
          dispatch(openLogin());
        }
      });
  };
}

export function switchToBoard(board: IBoard) {
  return push(`/boards/${board._id}`);
}

export function showAddQuoteModal() {
  return { type: ActionTypes.OPEN_POPUP, data: 'addQuote' };
}

export function showQuoteInfo(quote: IQuote) {
  return push(`/quotes/${quote._id}`);
}

export function showPersonStats(personId: string) {
  return push(`/people/${personId}`);
}

export function showBoardSettings(boardId: string) {
  return push(`/boards/${boardId}/settings`);
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

export function saveUserInfo(userData: IPerson) {
  // @ts-ignore
  return (dispatch: ThunkDispatch<{}, {}, any>, getStore, { emit }) => {
    emit(WS_EVENT_TYPES.SAVE_USER_INFO, userData);
  }
}
