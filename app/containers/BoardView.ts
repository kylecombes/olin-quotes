import { connect } from 'react-redux';
import {
  AnyAction,
  bindActionCreators,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import BoardView from '../components/BoardView';
import {
  showAddQuoteModal,
  showPersonStats,
  showQuoteInfo,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';

const mapStateToProps = (state: IRootState) => {
  if (!state.boards.currentBoardId || !state.quotes) {
    return {};
  }
  const board = state.boards.allBoards[state.boards.currentBoardId];
  const quotes = Object.values(state.quotes).filter(q => q.boardId === board._id);

  return {
    board,
    people: state.people,
    quotes,
    masonryLayoutTrigger: state.general.masonryLayoutTrigger,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return bindActionCreators(
    {
      showPersonStats: (personId: string) => dispatch(showPersonStats(personId)),
      showQuoteInfo: (quoteId: string) => dispatch(showQuoteInfo(quoteId)),
      showAddQuoteModal: () => dispatch(showAddQuoteModal()),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardView);
