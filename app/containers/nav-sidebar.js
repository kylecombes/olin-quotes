import { connect } from 'react-redux';
import NavSidebar from '../components/sidebars/nav-sidebar';
import {
  promptCreateBoard,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    boards: state.boards,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    promptCreateBoard: () => dispatch(promptCreateBoard()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavSidebar);
