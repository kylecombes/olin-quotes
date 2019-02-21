import { connect } from 'react-redux';
import PA from '../components/create-account';
import {
  addPerson,
} from '../data/actions';

const mapStateToProps = (state, containerProps) => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(addPerson(data)),
  }
};

const PersonAdd = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PA);

export default PersonAdd;
