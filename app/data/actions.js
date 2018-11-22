/* This file contains all of the Redux actions. */

export const ActionTypes = {
  ADD_PERSON: 'addPerson',
  ADD_QUOTE: 'addQuote',
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
