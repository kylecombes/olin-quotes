import { connect } from 'react-redux';
import {
  AnyAction,
  bindActionCreators,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import BoardViewPage from '../components/pages/BoardViewPage';
import {
  showAddQuoteModal,
  showPersonStats,
  showQuoteInfo,
  toggleQuoteLike,
} from '../data/actions';
import {
  IQuote,
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
  const quotes = Object.values(state.quotes).filter(q => q.boardId === board._id);

  return {
    board,
    people: state.people,
    quotes,
    masonryLayoutTrigger: state.general.masonryLayoutTrigger,
    userId: state.user._id,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return bindActionCreators(
    {
      showPersonStats: (personId: string) => dispatch(showPersonStats(personId)),
      showQuoteInfo: (quote: IQuote) => dispatch(showQuoteInfo(quote)),
      showAddQuoteModal: () => dispatch(showAddQuoteModal()),
      toggleQuoteLike: (quote: IQuote) => dispatch(toggleQuoteLike(quote)),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardViewPage);
