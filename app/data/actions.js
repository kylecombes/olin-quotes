/* This file contains all of the Redux actions. */

export const ActionTypes = {
  ADD_PERSON: 'addPerson',
  ADD_QUOTE: 'addQuote',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  SHOW_PERSON_STATS: 'SHOW_PERSON_STATS',
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

export function showPersonStats(personId) {
  return { type: ActionTypes.SHOW_PERSON_STATS, data: personId };
}

export function closeSidebar() {
  return { type: ActionTypes.CLOSE_SIDEBAR };
}
