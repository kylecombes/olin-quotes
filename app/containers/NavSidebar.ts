import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  promptCreateBoard,
  switchToBoard,
} from '../data/actions';
import {
  IBoard,
  IRootState,
} from '../data/types';
import {
  getCurrentBoardId,
} from '../utils';

import NavSidebar from '../components/NavSidebar';

const mapStateToProps = (state: IRootState) => {
  const currentBoardId = getCurrentBoardId(state);
  if (!state.boards) {
    return {};
  }
  return {
    currentBoardId,
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
