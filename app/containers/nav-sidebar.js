import { connect } from 'react-redux';
import NavSidebar from '../components/sidebars/NavSidebar';
import {
  promptCreateBoard,
  switchToBoard,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  if (!state.boards) {
    return {};
  }
  return {
    currentBoardId: state.boards.currentBoardId,
    boards: Object.values(state.boards.allBoards),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    promptCreateBoard: () => dispatch(promptCreateBoard()),
    switchToBoard: board => dispatch(switchToBoard(board)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavSidebar);
