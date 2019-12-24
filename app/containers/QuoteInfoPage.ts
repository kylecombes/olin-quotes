import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import QuoteInfoPage from '../components/pages/QuoteInfoPage';
import {
  closeSidebar,
  addQuoteComment,
  deleteQuoteComment,
  toggleQuoteCommentLike,
  updateQuoteComment,
} from '../data/actions';
import {
  IQuoteComment,
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
    userId: state.user._id,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    deleteComment: (comment: IQuoteComment) => dispatch(deleteQuoteComment(comment)),
    addComment: (quoteId: string, comment: string) => dispatch(addQuoteComment(quoteId, comment)),
    toggleCommentLike: (comment: IQuoteComment) => dispatch(toggleQuoteCommentLike(comment)),
    updateQuoteComment: (comment: IQuoteComment) => dispatch(updateQuoteComment(comment)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteInfoPage);
