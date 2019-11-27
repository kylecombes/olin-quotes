import { connect } from 'react-redux';
import NavSidebar from '../components/sidebars/NavSidebar';
import {
  promptCreateBoard,
  switchToBoard,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    currentBoard: state.boards.current,
    boards: Object.values(state.boards.all),
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
