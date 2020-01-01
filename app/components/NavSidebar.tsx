import * as React from 'react';
import {
  IBoard,
} from '../data/types';

import PlusIcon from '../assets/plus-icon.svg';
import OlinQuotesLogo from '../assets/olin-quotes-logo.svg';

type Props = {
  boards: IBoard[]
  currentBoardId: string
  promptCreateBoard: () => any
  switchToBoard: (board: IBoard) => any
};

export default (props: Props) => {
  const {
    currentBoardId,
    boards,
    switchToBoard,
  } = props;

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
        <OlinQuotesLogo />
      </div>
      <span className="section-header boards-header">Boards</span>
      <nav>
        {boardListElems}
      </nav>
      <div className="sidebar-button add-board" onClick={props.promptCreateBoard}>
        <PlusIcon />
        <span className="text">Create Board</span>
      </div>
    </div>
  );
}
