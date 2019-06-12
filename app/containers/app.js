import { connect } from 'react-redux';
import App from '../components/app';
import {
  addQuote,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    popupVisible: !!state.popup.type,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(addQuote(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);