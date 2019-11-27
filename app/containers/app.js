import { connect } from 'react-redux';
import App from '../components/App';
import {
  checkLoginStatus,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    popupVisible: !!state.popup.type,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkLoginStatus: () => dispatch(checkLoginStatus()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
