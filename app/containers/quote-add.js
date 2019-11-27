import { connect } from 'react-redux';
import QA from '../components/AddQuote/AddQuote';
import {
addQuote,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    people: Object.values(state.people),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(addQuote(data)),
  }
};

const QuoteAdd = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QA);

export default QuoteAdd;
