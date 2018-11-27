import React from 'react';

export default class PersonStats extends React.Component {

  render() {
    return (
      <div className="sidebar person-stats">
        <span className="close-button" onClick={this.props.closeSidebar}>X</span>
        <div className="header">
          <img className="avatar" src={this.props.person.avatarUrl} />
          <span className="name">{this.props.person.displayName}</span>
          <span className="title">{this.props.person.title}</span>
        </div>
      </div>
    )
  }

}