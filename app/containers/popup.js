import { connect } from 'react-redux';
import Popup from '../components/popup';
import {
  closePopup,
} from "../data/actions";

const mapStateToProps = (state, containerProps) => {
  return {
    type: state.popup.type,
    socket: state.general.socket,
    server: state.general.server,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(closePopup()),

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
