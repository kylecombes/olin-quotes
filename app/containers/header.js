import { connect } from 'react-redux';
import Header from '../components/header/header';
import {
  addQuote,
  openLogin,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    popupVisible: !!state.popup.type,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openLogin: () => dispatch(openLogin()),
    submit: data => dispatch(addQuote(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
