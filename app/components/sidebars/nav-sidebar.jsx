import React from 'react';
import OAuth from '../oauth';

export default class NavSidebar extends React.Component {

  render() {
    const currentGroup = 'Home';
    const groupListElems = ["Home", "PoE", "Tea in the High Castle"].map(name => {
      return (name === currentGroup)
        ? <span key={name} className="current">{name}</span>
        : <span key={name}>{name}</span>;
    });

    return (
      <div className="sidebar nav-sidebar">
        <div className="header">
          <h1>Olin Quotes</h1>
        </div>
        <nav>
          {groupListElems}
        </nav>
        <OAuth provider="google" socket={this.props.socket} server={this.props.server}/>
        <OAuth provider="facebook" socket={this.props.socket} server={this.props.server}/>
      </div>
    )
  }

}
