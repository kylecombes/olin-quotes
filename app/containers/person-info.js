import { connect } from 'react-redux';
import PI from '../components/sidebars/person-info';
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

const PersonInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PI);

export default PersonInfo;
