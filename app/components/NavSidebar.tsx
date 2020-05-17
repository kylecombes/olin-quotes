import * as React from 'react';
import {
  IBoard,
} from '../data/types';

import PlusIcon from '../assets/plus-icon.svg';
import OlinQuotesLogo from '../assets/olin-quotes-logo.svg';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

type Props = {
  currentBoardId: string
  promptCreateBoard: () => any
  switchToBoard: (board: IBoard) => any
};

const GET_INIT_DATA = gql`
  query GetBoards {
    isLoggedIn
    boards {
      _id
      name
      description
    }
  }
`;

export default (props: Props) => {
  const {
    data,
    error,
    loading,
  } = useQuery(GET_INIT_DATA);

  if (error) {
    console.error(error);
    return <p>An error occurred.</p>;
  }

  if (loading) return null;

  const {
    currentBoardId,
    switchToBoard,
  } = props;

  const boardListElems = data.boards.map((board: IBoard) => {
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
