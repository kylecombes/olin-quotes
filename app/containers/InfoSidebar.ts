import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import InfoSidebar from '../components/sidebars/InfoSidebar';
import {
  closeSidebar,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';
import {ThunkDispatch} from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  return {
    person: state.infoSidebar.elementId ? state.people[state.infoSidebar.elementId] : null,
    isVisible: !!state.infoSidebar.sidebarType,
    sidebarType: state.infoSidebar.sidebarType,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoSidebar);
