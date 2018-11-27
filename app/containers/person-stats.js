import { connect } from 'react-redux';
import PS from '../components/person-stats';
import {
  closeSidebar,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    person: state.people[state.infoSidebar.elementId],
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  }
};

const PersonStats = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PS);

export default PersonStats;
