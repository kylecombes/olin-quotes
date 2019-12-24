import { connect } from 'react-redux';
import QuoteInfoPage from '../components/pages/QuoteInfoPage';
import {
  closeSidebar,
  addQuoteComment,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  // Extract the quote ID from the URL
  const regexMatch = state.router.location.pathname.match(/^\/quotes\/(\w+)/);
  let quoteId;
  if (regexMatch) {
    quoteId = regexMatch[1];
  } else {
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
