import * as _ from 'lodash';
import * as React from 'react';

import BoardMembersEditor from '../BoardMembersEditor';

import {
  IBoard,
  IBoardMemberRole,
  IPerson,
} from '../../data/types';

type Props = {
  addBoardMember: (b: IBoard, p: IPerson, r: IBoardMemberRole) => any
  board: IBoard
  people: {[pid: string]: IPerson}
  removeBoardMember: (b: IBoard, p: IPerson) => any
};

export default (props: Props) => {
  const {
    addBoardMember,
    board,
    people,
    removeBoardMember,
  } = props;

  if (!board || _.isEmpty(people)) return null;

  return (
    <div className="page BoardSettingsPage">
      <h1>{board.name} Settings</h1>
      <BoardMembersEditor
        addBoardMember={addBoardMember}
        board={board}
        people={people}
        removeBoardMember={removeBoardMember}
      />
    </div>
  );
}
