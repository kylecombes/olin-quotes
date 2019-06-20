import { connect } from 'react-redux';
import Popup from '../components/popup';
import {
  closePopup,
  saveUserInfo,
} from "../data/actions";

const mapStateToProps = (state, containerProps) => {
  return {
    type: state.popup.type,
    socket: state.general.socket,
    server: state.general.server,
    userData: state.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createAccount: userData => dispatch(saveUserInfo(userData)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
