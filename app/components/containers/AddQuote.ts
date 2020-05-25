import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  branch,
  compose,
  pure,
  renderComponent,
} from 'recompose';

import AddQuote from '../AddQuote/AddQuote';

import * as BoardViewQuote from '../../fragments/BoardViewQuote.graphql';

const MUTATIONS = gql`
  mutation addQuote($quote: NewQuote!) {
    addQuote(quote: $quote) {
      success
      message
      quote {
        ...BoardViewQuote
      }
    }
  }
  ${BoardViewQuote}
`;


// const [addQuoteMutation, { loading: addingQuote, error: quoteAddError }] = useMutation(ADD_QUOTE);
/*
const closeModal = () => setState({...state, modalType: null});
const addQuote = (quote: INewQuote) => {
  addQuoteMutation({
    variables: {
      quote: {
        ...quote,
        boardId,
      },
    },
  }).then(() => closeModal());
};
const showAddQuoteModal = () => setState({...state, modalType: 'addQuote'});

let modal;
switch (state.modalType) {
  case 'addQuote':
    modal = <Modal close={closeModal} isClosable={true}>
      <AddQuote cancel={closeModal} people={peopleList} submit={addQuote} />
    </Modal>;
    break;
}
*/

const AddQuoteContainer = compose(
  graphql(MUTATIONS),
  pure,
)(AddQuote);

export default AddQuoteContainer;
