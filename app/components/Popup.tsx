import * as React from 'react';
import AddQuote from '../containers/AddQuote';
import Login from './Login';
import FinishAccountCreation from './FinishAccountCreation';
import CreateBoard from './CreateBoard';
import {
  INewBoard,
  IPerson,
} from '../data/types';

type Props = {
  close: () => any
  createAccount: (userData: IPerson) => any
  createBoard: (boardData: INewBoard) => any
  isClosable: boolean
  userData: IPerson
  type: string
};

const Popup: React.FC<Props> = (props: Props) => {
  let content = null;
  switch (props.type) {
    case 'login':
      content = <Login />;
      break;
    case 'finishAccountCreation':
      content = <FinishAccountCreation
        close={props.close}
        createAccount={props.createAccount}
        userData={props.userData}
       />;
      break;
    case 'createBoard':
      content = <CreateBoard
        addBoard={props.createBoard}
      />;
      break;
    case 'addQuote':
      content = <AddQuote />;
      break;
  }

  const containerOnClick = props.isClosable ? props.close : null;

  return (
    <div className="popup-container" onClick={containerOnClick}>
      <div onClick={e => e.stopPropagation()}>
        {content}
      </div>
    </div>
  )
};

export default Popup;
