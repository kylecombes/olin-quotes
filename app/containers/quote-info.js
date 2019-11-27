import { connect } from 'react-redux';
import QI from '../components/sidebars/QuoteInfo';
import {
  closeSidebar,
  addQuoteComment,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    quote: state.quotes[state.infoSidebar.elementId],
    people: state.people,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    addComment: (quoteId, comment) => dispatch(addQuoteComment(quoteId, comment)),
  }
};

const QuoteInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QI);

export default QuoteInfo;
