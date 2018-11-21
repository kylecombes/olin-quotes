import { connect } from 'react-redux';
import MQV from '../components/multi-quote-view';

const mapStateToProps = (state, containerProps) => {
  return {
    people: state.people,
    quotes: state.quotes,
  }
};

const mapDispatchToProps = (state, containerProps) => {
  return {

  }
};

const MultiQuoteView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MQV);

export default MultiQuoteView;
