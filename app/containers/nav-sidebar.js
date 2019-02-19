import { connect } from 'react-redux';
import NavSidebar from '../components/sidebars/nav-sidebar';

const mapStateToProps = (state, containerProps) => {
  return {
    socket: state.general.socket,
    server: state.general.server,
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavSidebar);
