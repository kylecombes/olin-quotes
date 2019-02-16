import React from 'react';

export default class PersonInfo extends React.Component {

  render() {
    return (
      <div className="person-info">
        <div className="header">
          <img className="avatar" src={this.props.person.avatarUrl} />
          <span className="name">{this.props.person.displayName}</span>
          <span className="title">{this.props.person.title}</span>
        </div>
      </div>
    )
  }

}