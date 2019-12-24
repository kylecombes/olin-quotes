import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import PersonInfoPage from '../components/pages/PersonInfoPage';
import {
  closeSidebar,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';
import {
  getCurrentPersonId,
} from '../utils';

const mapStateToProps = (state: IRootState) => {
  const personId = getCurrentPersonId(state);
  if (!personId) {
    return {};
  }
  return {
    person: state.people[personId],
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
)(PersonInfoPage);
