
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
  comments: IQuoteComment[]
  components: IQuoteComponent[]
}

export interface IQuoteComment {
  authorId: string
  text: string
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

export interface IInfoSidebarState {
  elementId: string
  sidebarType: string
}

export interface INavSidebarState {
  visible: boolean
}

export interface IRootState {
  boards: IBoardsState
  general: IGeneralState
  infoSidebar: IInfoSidebarState
  navSidebar: INavSidebarState
  people: {
    [personId: string]: IUser
  }
  popup: IPopupState
  quotes: {
    [quoteId: string]: IQuote
  }
  user: IUser
}

/* ---------- End State Interfaces ---------- */
