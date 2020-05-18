import * as React from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  IBoard,
} from '../data/types';

import PlusIcon from '../assets/plus-icon.svg';
import OlinQuotesLogo from '../assets/olin-quotes-logo.svg';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

type Props = {
  promptCreateBoard: () => any
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
  const { boardId: currentBoardId } = useParams();

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

  const boardListElems = data.boards.map((board: IBoard) => {
    let className = currentBoardId === board._id ? 'current sidebar-button' : 'sidebar-button';
    return (
      <Link
        key={board._id}
        className={className}
        to={`/boards/${board._id}`}
        title={board.description}>
        {board.name}
      </Link>
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
