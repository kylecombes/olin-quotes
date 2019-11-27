import { connect } from 'react-redux';
import IS from '../components/sidebars/InfoSidebar';
import {
  closeSidebar,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    person: state.people[state.infoSidebar.elementId],
    isVisible: !!state.infoSidebar.sidebarType,
    sidebarType: state.infoSidebar.sidebarType,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  }
};

const InfoSidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IS);

export default InfoSidebar;
