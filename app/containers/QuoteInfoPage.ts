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
  return {
    quote: state.quotes[state.infoSidebar.elementId],
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
