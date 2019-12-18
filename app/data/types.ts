import { ActionType } from 'typesafe-actions';

import * as allActions from './actions';

export interface IBoard {
  _id: string
  description: string
  name: string
}

export interface IPopupState {
  isClosable: boolean
  type: string
}

export interface IQuote {
  _id: string
  addDate: Date
  addedBy: string
  boardId: string
  components: IQuoteComponent[]
}

export interface IQuoteComponent {
  personId: string
  words: string
}

export interface IUser {
  _id: string | undefined
  firstName: string
  lastName: string
  displayName: string
  classYear: number
  avatarUrl: string
}


/* ---------- Begin State Interfaces ---------- */

export interface IBoardsState {
  currentBoardId: string | null
  allBoards: {
    [boardId: string]: IBoard
  }
}

export interface IGeneralState {
  debug: boolean
  isMobile: boolean
  focusedPersonId: string
  masonryLayoutTrigger: boolean
  server: string
}

export interface IRootState {
  boards: IBoardsState
  general: IGeneralState
  people: IUser[]
  popup: IPopupState
  quotes: IQuote[]
  user: IUser
}

/* ---------- End State Interfaces ---------- */
