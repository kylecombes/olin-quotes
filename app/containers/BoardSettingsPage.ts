import { connect } from 'react-redux';
import {
  AnyAction,
  bindActionCreators,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import BoardSettingsPage from '../components/pages/BoardSettingsPage';
import {
  addBoardMember,
  changeBoardMemberRole,
  removeBoardMember,
  renameBoard,
} from '../data/actions';
import {
  IBoard,
  IBoardMemberRole,
  IPerson,
  IRootState,
} from '../data/types';
import {
  getCurrentBoardId,
} from '../utils';

const mapStateToProps = (state: IRootState) => {
  const boardId = getCurrentBoardId(state);
  const board = state.boards.allBoards[boardId];
  if (!board) {
    return {};
  }
  return {
    board,
    people: state.people,
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return bindActionCreators(
    {
      addBoardMember: (b: IBoard, p: IPerson, r: IBoardMemberRole) => dispatch(addBoardMember(b, p, r)),
      changeBoardMemberRole: (b: IBoard, p: IPerson, r: IBoardMemberRole) => dispatch(changeBoardMemberRole(b, p, r)),
      removeBoardMember: (b: IBoard, p: IPerson) => dispatch(removeBoardMember(b, p)),
      renameBoard: (b: IBoard, newName: string) => dispatch(renameBoard(b, newName)),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardSettingsPage);
