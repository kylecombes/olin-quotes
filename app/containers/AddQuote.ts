import { connect } from 'react-redux';
import AddQuote from '../components/AddQuote/AddQuote';
import {
  addQuote,
  closePopup,
} from '../data/actions';
import {
  IQuote,
  IRootState,
} from '../data/types';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  return {
    people: Object.values(state.people),
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    cancel: () => dispatch(closePopup()),
    submit: (data: IQuote) => dispatch(addQuote(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddQuote);
