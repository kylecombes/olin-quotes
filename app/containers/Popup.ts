import { connect } from 'react-redux';
import Popup from '../components/Popup';
import {
  addBoard,
  closePopup,
  saveUserInfo,
} from '../data/actions';
import {
  getSocket,
} from '../data/websockets';
import {
  INewBoard,
  IPerson,
  IRootState,
} from '../data/types';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  return {
    isClosable: state.popup.isClosable,
    socket: getSocket(),
    server: state.general.server,
    type: state.popup.type,
    userData: state.user,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    addBoard: (data: INewBoard) => dispatch(addBoard(data)),
    close: () => dispatch(closePopup()),
    createAccount: (userData: IPerson) => dispatch(saveUserInfo(userData)),
    createBoard: (boardData: INewBoard) => dispatch(addBoard(boardData)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
