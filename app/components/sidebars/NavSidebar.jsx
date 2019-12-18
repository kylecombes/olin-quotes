import React from 'react';

export default class NavSidebar extends React.Component {

  render() {
    const boardListElems = this.props.boards.map(board => {
      let className = this.props.currentBoardId === board._id ? 'current' : null;
      return (
        <span
          key={board._id}
          className={className}
          onClick={() => this.props.switchToBoard(board)}
          title={board.description}>
          {board.name}
        </span>
      );
    });

    return (
      <div className="sidebar nav-sidebar">
        <div className="header">
          <h1>Olin Quotes</h1>
        </div>
        <nav>
          {boardListElems}
        </nav>
        <a onClick={this.props.promptCreateBoard}>Create Board</a>
      </div>
    )
  }

}
