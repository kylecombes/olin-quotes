import * as _ from 'lodash';
import * as React from 'react';

import {
  IBoard, IBoardMemberRole,
  IPerson,
} from '../../data/types';
import AutosuggestPerson from '../AutosuggestPerson';

type Props = {
  addBoardMember: (b: IBoard, p: IPerson, r: IBoardMemberRole) => any
  board: IBoard
  people: {[pid: string]: IPerson}
};

type State = {
  role: IBoardMemberRole
  user: IPerson
};

const initialState: State = {
  role: 'admin',
  user: null,
};

export default (props: Props) => {
  const {
    board,
    people,
  } = props;

  if (!board || _.isEmpty(people)) return null;

  const [state, setState] = React.useState(initialState);

  const setNewMemberRole = (role: IBoardMemberRole) => setState({...state, role});
  const setNewMemberId = (user: IPerson) => setState({...state, user});
  const addMember = () => {
    if (state.user) {
      props.addBoardMember(board, state.user, state.role);
      setState(initialState);
    }
  };

  const memberElements = board.members?.map(m => {
    const changeRole = () => {};
    return (
      <Member
        changeRole={changeRole}
        key={m.personId}
        person={people[m.personId]}
        role={m.role}
      />
    );
  });

  return (
    <div className="page BoardSettingsPage">
      <h1>{board.name} Settings</h1>
      <div className="members">
        {memberElements}
        <div className="add-member">
          <AutosuggestPerson
            // TODO: Add the right function call here
            onAddPersonClick={() => {}}
            onPersonSelected={setNewMemberId}
            people={Object.values(people)}
            placeholder="Name"
          />
          <RoleSelect
            currentSelection={state.role}
            onSelect={setNewMemberRole}
          />
          <button onClick={addMember}>Add</button>
        </div>
      </div>
    </div>
  );
}

type MemberProps = {
  changeRole: (newRole: IBoardMemberRole) => any
  person: IPerson
  role: IBoardMemberRole
};

const Member: React.FC<MemberProps> = (props: MemberProps) => {
  const {
    changeRole,
    person,
    role,
  } = props;

  return (
    <div className="Member">
      {person.displayName}
      <RoleSelect
        currentSelection={role}
        onSelect={changeRole}
      />
    </div>
  );
};

type RoleSelectProps = {
  currentSelection: IBoardMemberRole
  onSelect: (value: IBoardMemberRole) => any
};

const RoleSelect: React.FC<RoleSelectProps> = (props: RoleSelectProps) => {
  const {
    currentSelection: s,
    onSelect,
  } = props;
  const onChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value as IBoardMemberRole);
  return (
    <select onChange={onChangeSelection} className="role-select">
      <option value="admin" selected={s === 'admin'}>Admin</option>
      <option value="contributor" selected={s === 'contributor'}>Contributor</option>
      <option value="viewer" selected={s === 'viewer'}>View Only</option>
    </select>
  );
};
