import { connect } from 'react-redux';
import Popup from '../components/popup';
import {
  closePopup,
  createUserAccount,
} from "../data/actions";

const mapStateToProps = (state, containerProps) => {
  return {
    type: state.popup.type,
    socket: state.general.socket,
    server: state.general.server,
    userData: state.popup.userData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(closePopup()),
    createAccount: userData => dispatch(createUserAccount(userData)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
