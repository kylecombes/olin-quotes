import { connect } from 'react-redux';

import NavSidebar from '../components/NavSidebar';
import {
  promptCreateBoard,
  switchToBoard,
} from '../data/actions';
import {
  IBoard,
  IRootState,
} from '../data/types';
import {
  Dispatch,
} from 'redux';

const mapStateToProps = (state: IRootState) => {
  if (!state.boards) {
    return {};
  }
  return {
    currentBoardId: state.boards.currentBoardId,
    boards: Object.values(state.boards.allBoards),
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    promptCreateBoard: () => dispatch(promptCreateBoard()),
    switchToBoard: (board: IBoard) => dispatch(switchToBoard(board)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavSidebar);
