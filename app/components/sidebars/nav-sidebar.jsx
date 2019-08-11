import React from 'react';

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
        <a onClick={this.props.promptCreateBoard}>Create Board</a>
      </div>
    )
  }

}
