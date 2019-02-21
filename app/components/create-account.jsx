import React from 'react';

export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);

    const { userData } = this.props;

    this.state = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: userData.displayName,
      classYear: '',
      avatarUrl: userData.avatarUrl,
    };
  }

  textFieldChanged = (event) => this.setState({[event.target.name]: event.target.value});

  submitClicked = () => {
    this.props.createAccount(this.state);
    this.props.clone();
  };

  render() {
    return (
      <div className="person-add sidebar">
        <h2 className="header">Create Account</h2>
        <img src={this.state.avatarUrl} />
        <input name="firstName" placeholder="First name" type="text" value={this.state.firstName} onChange={this.textFieldChanged} />
        <input name="lastName" placeholder="Last name" type="text" value={this.state.lastName} onChange={this.textFieldChanged} />
        <input name="displayName" placeholder="Display name" type="text" value={this.state.displayName} onChange={this.textFieldChanged} />
        <input name="classYear" placeholder="Class year" type="number" value={this.state.classYear} onChange={this.textFieldChanged} />
        <button className="submit" onClick={this.submitClicked}>Add</button>
        <button className="cancel" onClick={this.props.close}>Cancel</button>
      </div>
    )
  }

}