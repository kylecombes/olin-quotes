import { connect } from 'react-redux';
import PersonInfo from '../components/sidebars/PersonInfo';
import {
  closeSidebar,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  return {
    person: state.people[state.infoSidebar.elementId],
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonInfo);
