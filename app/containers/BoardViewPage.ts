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
} from '../data/actions';
import {
  IQuote,
  IRootState,
} from '../data/types';

const mapStateToProps = (state: IRootState) => {
  // Extract the board ID from the URL
  const regexMatch = state.router.location.pathname.match(/^\/boards\/(\w+)/);
  let boardId;
  if (regexMatch) {
    boardId = regexMatch[1];
  } else {
    return {};
  }
  const board = state.boards.allBoards[boardId];
  if (!board) {
    // This function gets called after the URL changes, so sometimes the resolved ID
  }
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
      showQuoteInfo: (quote: IQuote) => dispatch(showQuoteInfo(quote)),
      showAddQuoteModal: () => dispatch(showAddQuoteModal()),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardViewPage);
