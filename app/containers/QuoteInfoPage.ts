import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import QuoteInfoPage from '../components/pages/QuoteInfoPage';
import {
  closeSidebar,
  addQuoteComment,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';
import {
  getCurrentQuoteId,
} from '../utils';

const mapStateToProps = (state: IRootState) => {
  const quoteId = getCurrentQuoteId(state);
  if (!quoteId) {
    return {};
  }

  if (!state.quotes[quoteId]) {
    return {};
  }

  return {
    quote: state.quotes[quoteId],
    people: state.people,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    addComment: (quoteId: string, comment: string) => dispatch(addQuoteComment(quoteId, comment)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteInfoPage);
