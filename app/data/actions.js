/* This file contains all of the Redux actions. */

export const ActionTypes = {
  ADD_PERSON: 'addPerson',
  ADD_QUOTE: 'addQuote',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  SHOW_PERSON_STATS: 'SHOW_PERSON_STATS',
  SHOW_QUOTE_INFO: 'SHOW_QUOTE_INFO',
  MASONRY_RECALCULATE_LAYOUT: 'MASONRY_RECALCULATE_LAYOUT',
};

export function addPerson(personData) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_PERSON, personData);
  }
}

export function addQuote(quoteData) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_QUOTE, quoteData);
  }
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

export function closeSidebar() {
  return dispatch => {
    dispatch({ type: ActionTypes.CLOSE_SIDEBAR });
    dispatch(masonryRecalculateLayout());
  }
}

export function masonryRecalculateLayout() {
  return { type: ActionTypes.MASONRY_RECALCULATE_LAYOUT };
}
