import { connect } from 'react-redux';
import BoardView from '../components/BoardView';
import {
  showAddQuoteModal,
  showPersonStats,
  showQuoteInfo,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  const board = state.boards.current;
  const quotes = state.quotes && board ? Object.values(state.quotes).filter(q => q.boardId === board._id) : null;

  return {
    board,
    people: state.people,
    quotes,
    masonryLayoutTrigger: state.general.masonryLayoutTrigger,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showPersonStats: personId => dispatch(showPersonStats(personId)),
    showQuoteInfo: quoteId => dispatch(showQuoteInfo(quoteId)),
    showAddQuoteModal: () => dispatch(showAddQuoteModal()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardView);
