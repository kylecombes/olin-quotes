import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import QuoteInfoPage from '../components/pages/QuoteInfoPage';
import {
  closeSidebar,
  addQuoteComment,
  deleteQuoteComment,
  toggleQuoteCommentLike,
  updateQuoteComment,
  toggleQuoteLike,
} from '../data/actions';
import {
  IQuote,
  IQuoteComment,
  IRootState,
} from '../data/types';
import {
  getCurrentQuoteId,
  userLikedItem,
} from '../utils';

const mapStateToProps = (state: IRootState) => {
  const quoteId = getCurrentQuoteId(state);
  if (!quoteId) {
    return {};
  }

  if (!state.quotes[quoteId]) {
    return {};
  }

  const quote = state.quotes[quoteId];

  return {
    quote,
    people: state.people,
    user: state.user,
    userLikedQuote: userLikedItem(quote, state.user),
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    deleteComment: (comment: IQuoteComment) => dispatch(deleteQuoteComment(comment)),
    addComment: (quoteId: string, comment: string) => dispatch(addQuoteComment(quoteId, comment)),
    toggleCommentLike: (comment: IQuoteComment) => dispatch(toggleQuoteCommentLike(comment)),
    toggleQuoteLike: (quote: IQuote) => dispatch(toggleQuoteLike(quote)),
    updateQuoteComment: (comment: IQuoteComment) => dispatch(updateQuoteComment(comment)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteInfoPage);
