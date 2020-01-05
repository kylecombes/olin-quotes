import * as React from 'react';

import AutosuggestPerson from './AutosuggestPerson';
import Avatar from './Avatar';

import {
  IBoard,
  IBoardMemberRole,
  IPerson,
} from '../data/types';


type MembersListProps = {
  addBoardMember: (b: IBoard, p: IPerson, r: IBoardMemberRole) => any
  board: IBoard
  people: {[pid: string]: IPerson}
};

type MembersListState = {
  role: IBoardMemberRole
  user: IPerson
};

const initialState: MembersListState = {
  role: 'admin',
  user: null,
};

const BoardMembersEditor: React.FC<MembersListProps> = (props: MembersListProps) => {
  const {
    addBoardMember,
    board,
    people,
  } = props;

  const [state, setState] = React.useState(initialState);

  const setNewMemberRole = (role: IBoardMemberRole) => setState({...state, role});
  const setNewMemberId = (user: IPerson) => setState({...state, user});
  const addMember = () => {
    if (state.user) {
      addBoardMember(board, state.user, state.role);
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
    <table className="BoardMembersEditor">
      <thead>
        <td/>
        <td>Name</td>
        <td>Role</td>
      </thead>
      <tbody>
        {memberElements}
      </tbody>
      <tfoot className="add-member">
        <td>
          <Avatar user={state.user}/>
        </td>
        <td className="autosuggest-person">
          <AutosuggestPerson
            // TODO: Add the right function call here
            onAddPersonClick={() => {}}
            onPersonSelected={setNewMemberId}
            people={Object.values(people)}
            placeholder="Name"
          />
        </td>
        <td className="role">
          <RoleSelect
            currentSelection={state.role}
            onSelect={setNewMemberRole}
          />
        </td>
        <td>
          <button onClick={addMember}>Add</button>
        </td>
      </tfoot>
    </table>
  );
};

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
    <tr className="Member">
      <td>
        <Avatar user={person} />
      </td>
      <td className="name">{person.displayName}</td>
      <td className="role-select bordered">
        <RoleSelect
          currentSelection={role}
          onSelect={changeRole}
        />
      </td>
    </tr>
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
    <select onChange={onChangeSelection} className="role-select dark-flat">
      <option value="admin" selected={s === 'admin'}>Admin</option>
      <option value="contributor" selected={s === 'contributor'}>Contributor</option>
      <option value="viewer" selected={s === 'viewer'}>View Only</option>
    </select>
  );
};

export default BoardMembersEditor;
