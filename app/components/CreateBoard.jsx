import React from 'react';


export default class CreateBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
    };
  }

  textFieldChanged = event => this.setState({[event.target.name]: event.target.value});

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