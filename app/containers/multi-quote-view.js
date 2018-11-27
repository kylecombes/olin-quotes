import { connect } from 'react-redux';
import MQV from '../components/multi-quote-view';
import {
  showPersonStats,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    people: state.people,
    quotes: state.quotes,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showPersonStats: personId => dispatch(showPersonStats(personId)),
  }
};

const MultiQuoteView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MQV);

export default MultiQuoteView;
