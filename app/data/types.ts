import { RouterState } from 'connected-react-router';

export interface IBoard extends INewBoard {
  _id: string
}

export interface INewBoard {
  description: string
  name: string
}

export interface INewQuote {
  components: IQuoteComponent[]
  context?: string
}

export interface IPopupState {
  isClosable: boolean
  type: string
}

export interface IQuote extends INewQuote {
  _id: string
  addDate: Date
  addedBy: string
  boardId: string
  comments?: IQuoteComment[]
}

export interface IQuoteComment {
  added: string
  authorId: string
  content: string
}

export interface IQuoteComponent {
  personId: string
  content: string
}

export interface IQuoteComponentUpdate {
  personId?: string
  content?: string
}

export interface IPerson {
  _id: string | undefined
  firstName: string
  lastName: string
  displayName: string
  classYear: number
  avatarUrl: string
}

export interface IWebSocketMessagePayload {

}

/* ---------- Begin State Interfaces ---------- */

export interface IBoardsState {
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

export interface INavSidebarState {
  visible: boolean
}

export interface IRootState {
  boards: IBoardsState
  general: IGeneralState
  navSidebar: INavSidebarState
  people: {
    [personId: string]: IPerson
  }
  popup: IPopupState
  quotes: {
    [quoteId: string]: IQuote
  }
  router: RouterState
  user: IPerson
}

/* ---------- End State Interfaces ---------- */
