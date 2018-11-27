import React from 'react';

export default class PersonAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      avatarUrl: '',
    };
  }

  textFieldChanged = (event) => this.setState({[event.target.name]: event.target.value});

  submitClicked = () => {
    const data = Object.assign({}, this.state, {
      displayName: `${this.state.firstName} ${this.state.lastName}`,
    });
    this.props.submit(data);
    this.props.closeAddPersonPane();
  };

  render() {
    return (
      <div className="person-add sidebar">
        <h2 className="header">Add Person</h2>
        <input name="firstName" placeholder="First name" type="text" onChange={this.textFieldChanged} />
        <input name="lastName" placeholder="Last name" type="text" onChange={this.textFieldChanged} />
        <input name="title" placeholder="Title" type="text" onChange={this.textFieldChanged} />
        <input name="avatarUrl" placeholder="Avatar URL" type="text" onChange={this.textFieldChanged} />
        <img src={this.state.avatarUrl} />
        <button className="submit" onClick={this.submitClicked}>Add</button>
        <button className="cancel" onClick={this.props.closeAddPersonPane}>Cancel</button>
      </div>
    )
  }

}