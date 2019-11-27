import { connect } from 'react-redux';
import AddQuote from '../components/AddQuote/AddQuote';
import {
  addQuote,
  closePopup,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    people: Object.values(state.people),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    cancel: () => dispatch(closePopup()),
    submit: data => dispatch(addQuote(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddQuote);
