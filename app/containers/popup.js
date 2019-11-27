import { connect } from 'react-redux';
import Popup from '../components/popup';
import {
  addBoard,
  saveUserInfo,
} from "../data/actions";
import {
  getSocket,
} from '../data/websockets';

const mapStateToProps = (state, containerProps) => {
  return {
    type: state.popup.type,
    socket: getSocket(),
    server: state.general.server,
    userData: state.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createAccount: userData => dispatch(saveUserInfo(userData)),
    addBoard: data => dispatch(addBoard(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
