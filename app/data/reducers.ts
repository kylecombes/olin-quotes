// This file contains a bunch of Redux reducers

import { AnyAction } from 'redux';

import { ActionTypes } from './actions';
import { WS_EVENT_TYPES } from './websockets';
import {
  IBoard,
  IBoardsState,
  IGeneralState,
  IPopupState,
} from './types';

const defaultBoardsState: IBoardsState = {
  allBoards: {},
};

export function boards(state: IBoardsState = defaultBoardsState, action: AnyAction) {
  switch (action.type) {
    case WS_EVENT_TYPES.BOARD_LIST_RECEIVED:
      const allBoards: {[id: string]: IBoard} = action.data;
      return {...state, allBoards};
    case WS_EVENT_TYPES.BOARD_UPDATE:
      const board = action.data;
      return {
        ...state,
        allBoards: {
          ...state.allBoards,
          [board._id]: board,
        },
      };
    case ActionTypes.SWITCH_TO_BOARD:
    case WS_EVENT_TYPES.SWITCH_TO_BOARD:
      return Object.assign({}, state, {
        currentBoardId: action.data._id,
      });
    default:
      return state;
  }
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
const defaultGeneralState: IGeneralState = {
  // @ts-ignore
  debug: window.debug,
  isMobile,
  focusedPersonId: null,
  masonryLayoutTrigger: false,
  // @ts-ignore
  server: window.SERVER_URI,
};

export function general(state: IGeneralState = defaultGeneralState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.MASONRY_RECALCULATE_LAYOUT:
      return Object.assign({}, state, {
        masonryLayoutTrigger: !state.masonryLayoutTrigger,
      });
    default:
      return state;
  }
}

export function people(state = {}, action: AnyAction) {
  switch (action.type) {
    case WS_EVENT_TYPES.PEOPLE_UPDATE:
      return action.data;
    default:
      return state;
  }
}

const defaultPopupState: IPopupState = {
  type: null,
  isClosable: true,
};

export function popup(state: IPopupState = defaultPopupState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.OPEN_POPUP:
      return Object.assign({}, state, {
        type: action.data,
      });
    case ActionTypes.CLOSE_POPUP:
      return Object.assign({}, state, {
        type: null,
      });
    case WS_EVENT_TYPES.CURRENT_USER_INFO:
      if (action.data.accountSetupComplete) {
        return Object.assign({}, state, {
          type: null,
        });
      } else {
        return Object.assign({}, state, {
          type: 'finishAccountCreation',
          isClosable: false,
        })
      }
    default:
      return state;
  }
}

export function quotes(state = {}, action: AnyAction) {

  switch (action.type) {
    case WS_EVENT_TYPES.QUOTES_UPDATE:
      return action.data;
    case WS_EVENT_TYPES.SINGLE_QUOTE_UPDATE:
      const quoteData = action.data;
      return Object.assign({}, state, {
        [quoteData._id]: quoteData,
      });
    default:
      return state;
  }
}

export function user(state = {}, action: AnyAction) {
  switch (action.type) {
    case WS_EVENT_TYPES.CURRENT_USER_INFO:
      return Object.assign({}, state, action.data);
    case WS_EVENT_TYPES.PROMPT_ACCOUNT_CREATION:
      // TODO: Add an account setup wizard
    default:
      return state;
  }
}
