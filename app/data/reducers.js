// This file contains a bunch of Redux reducers

import { ActionTypes } from './actions';
import { WS_EVENT_TYPES } from './websockets';

export function general(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.MASONRY_RECALCULATE_LAYOUT:
      return Object.assign({}, state, {
        masonryLayoutTrigger: !state.masonryLayoutTrigger,
      });
    case ActionTypes.DISPLAY_MESSAGE:
      alert(action.message);
      return state;
    case ActionTypes.DISPLAY_ERROR:
      alert((action.message) ? action.message : action.error);
      console.error(action.error);
      // TODO: Report error to some server
      return state;
    default:
      return state;
  }
}

export function infoSidebar(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SHOW_PERSON_STATS:
      return Object.assign({}, state, {
        sidebarType: 'personInfo',
        elementId: action.data,
      });
    case ActionTypes.SHOW_QUOTE_INFO:
      return Object.assign({}, state, {
        sidebarType: 'quoteInfo',
        elementId: action.data,
      });
    case ActionTypes.CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarType: null,
        elementId: null,
      });
    default:
      return state;
  }
}

export function navSidebar(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function people(state = {}, action) {

  switch (action.type) {
    case WS_EVENT_TYPES.PEOPLE_UPDATE:
      return action.data;
    default:
      return state;
  }
}

export function quotes(state = {}, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case WS_EVENT_TYPES.QUOTES_UPDATE:
      return action.data;
    default:
      return state;
  }
}
