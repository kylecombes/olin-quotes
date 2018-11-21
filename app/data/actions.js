/* This file contains all of the Redux actions. */

export const ActionTypes = {
  ADD_QUOTE: 'ADD_QUOTE',
  ADD_PERSON: 'addPerson',
};

export function addPerson(personData) {
  return (dispatch, getStore, { emit }) => {
    emit(ActionTypes.ADD_PERSON, personData);
  }
}
