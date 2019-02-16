import { connect } from 'react-redux';
import QI from '../components/sidebars/quote-info';
import {
  closeSidebar,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    quote: state.quotes[state.infoSidebar.elementId],
    people: state.people,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  }
};

const QuoteInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QI);

export default QuoteInfo;
