import { connect } from 'react-redux';
import BoardView from '../components/BoardView';
import {
  showAddQuoteModal,
  showPersonStats,
  showQuoteInfo,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    board: state.boards.current,
    people: state.people,
    quotes: state.quotes,
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
