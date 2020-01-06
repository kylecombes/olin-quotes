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
  renameBoard: (b: IBoard, newName: string) => any
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

  const renameBoard = (newName: string) => props.renameBoard(board, newName);

  return (
    <div className="page BoardSettingsPage constrained-content">
      <div>
        <h1>{board.name} Settings</h1>
        <InfoSection title="Name" headingType={Heading.h2}>
          <BoardNameEditor boardName={board.name} saveName={renameBoard}/>
        </InfoSection>
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

type BoardNameEditorProps = {
  boardName: string
  saveName: (newName: string) => any
};

const BoardNameEditor: React.FC<BoardNameEditorProps> = (props: BoardNameEditorProps) => {
  const [name, setName] = React.useState(props.boardName);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const reset = () => setName(props.boardName);
  const save = () => props.saveName(name);
  return (
    <div className="BoardNameEditor">
      <input type="text" value={name} onChange={onChange} />
      <button onClick={reset} disabled={props.boardName === name}>Reset</button>
      <button onClick={save}>Save</button>
    </div>
  );
};
