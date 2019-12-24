import * as React from 'react';
import {
  IBoard,
} from '../data/types';

type Props = {
  boards: IBoard[]
  currentBoardId: string
  promptCreateBoard: () => any
  switchToBoard: (board: IBoard) => any
};

export default class NavSidebar extends React.Component<Props> {

  render() {
    const {
      currentBoardId,
      boards,
      switchToBoard,
    } = this.props;

    if (!boards) {
      return null;
    }

    const boardListElems = boards.map(board => {
      let className = currentBoardId === board._id ? 'current sidebar-button' : 'sidebar-button';
      return (
        <span
          key={board._id}
          className={className}
          onClick={() => switchToBoard(board)}
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
        <span className="section-header boards-header">Boards</span>
        <nav>
          {boardListElems}
        </nav>
        <a className="sidebar-button" onClick={this.props.promptCreateBoard}>+ Create Board</a>
      </div>
    )
  }

}
