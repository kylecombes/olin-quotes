import * as React from 'react';
import {
  IBoard,
} from '../../data/types';

type Props = {
  boards: IBoard[]
  currentBoardId: string
  promptCreateBoard: () => any
  switchToBoard: (board: IBoard) => any
};

export default class NavSidebar extends React.Component<Props> {

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
