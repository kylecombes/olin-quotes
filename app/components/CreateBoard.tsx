import * as React from 'react';
import {
  IBoardMember,
  INewBoard,
} from '../data/types';

type Props = {
  addBoard: (boardData: INewBoard) => any
};

export default class CreateBoard extends React.Component<Props, INewBoard> {

  state = {
    name: '',
    description: '',
    // TODO: Add the ability to add board members in this component
    members: [] as IBoardMember[],
  };

  // @ts-ignore
  textFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({[event.target.name]: event.target.value});

  submit = () => this.props.addBoard(this.state);

  render() {
    return (
      <div className="create-board">
        <label>
          Name
          <br />
          <input name="name" onChange={this.textFieldChanged} />
        </label>
        <br />
        <label>
          Description
          <br />
          <input name="description" onChange={this.textFieldChanged} />
        </label>
        <br />
        <button onClick={this.submit}>Add</button>
      </div>
    )
  }

}
