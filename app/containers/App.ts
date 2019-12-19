import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import App from '../components/App';
import {
  checkLoginStatus,
} from '../data/actions';
import {
  IRootState,
} from '../data/types';

const mapStateToProps = (state: IRootState) => {
  return {
    popupVisible: !!state.popup.type,
    loggedIn: !!state.user,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    checkLoginStatus: () => dispatch(checkLoginStatus()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
