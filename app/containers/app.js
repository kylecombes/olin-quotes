import { connect } from 'react-redux';
import A from '../components/app';
import {
addQuote,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {
    infoSidebar: state.infoSidebar,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(addQuote(data)),
  }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(A);

export default App;
