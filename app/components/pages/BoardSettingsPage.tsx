import * as _ from 'lodash';
import * as React from 'react';

import {IBoard, IBoardMemberRole, IPerson,} from '../../data/types';

import BoardMembersEditor from '../BoardMembersEditor';
import InfoSection, {Heading} from '../InfoSection';

type Props = {
  addBoardMember: (b: IBoard, p: IPerson, r: IBoardMemberRole) => any
  board: IBoard
  changeBoardMemberRole: (b: IBoard, p: IPerson, r: IBoardMemberRole) => any
  people: {[pid: string]: IPerson}
  removeBoardMember: (b: IBoard, p: IPerson) => any
};

export default (props: Props) => {
  const {
    addBoardMember,
    board,
    changeBoardMemberRole,
    people,
    removeBoardMember,
  } = props;

  if (!board || _.isEmpty(people)) return null;

  return (
    <div className="page BoardSettingsPage constrained-content">
      <div>
        <h1>{board.name} Settings</h1>
        <InfoSection title="Members" headingType={Heading.h2} collapseHeadingMargin={true}>
          <BoardMembersEditor
            addBoardMember={addBoardMember}
            board={board}
            changeBoardMemberRole={changeBoardMemberRole}
            people={people}
            removeBoardMember={removeBoardMember}
          />
        </InfoSection>
      </div>
    </div>
  );
}
