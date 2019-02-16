import { connect } from 'react-redux';
import MQV from '../components/multi-quote-view';
import {
  showPersonStats,
  showQuoteInfo,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    people: state.people,
    quotes: state.quotes,
    masonryLayoutTrigger: state.general.masonryLayoutTrigger,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showPersonStats: personId => dispatch(showPersonStats(personId)),
    showQuoteInfo: quoteId => dispatch(showQuoteInfo(quoteId)),
  }
};

const MultiQuoteView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MQV);

export default MultiQuoteView;
