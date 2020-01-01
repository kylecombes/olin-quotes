import {
  ILike,
  IPerson, IQuote,
  IRootState,
} from './data/types';

const extractIdFromUrl = (state: IRootState, urlBase: string): (string|undefined) => {
  const regexMatch = state.router.location.pathname.match(new RegExp(`^\\/${urlBase}\\/(\\w+)`));
  if (regexMatch) {
    return regexMatch[1];
  }
  return undefined;
};

export const getCurrentBoardId = (state: IRootState) => extractIdFromUrl(state, 'boards');
export const getCurrentPersonId = (state: IRootState) => extractIdFromUrl(state, 'people');
export const getCurrentQuoteId = (state: IRootState) => extractIdFromUrl(state, 'quotes');

export function indexOf<T> (iter: Array<T>, checkFn: (item: T) => boolean): number {
  for (let i = 0; i < iter.length; ++i)
    if (checkFn(iter[i]))
      return i;
  return -1;
}

export function userLikedItem(item: {likes: ILike[]}, user: IPerson) {
  return item.likes && indexOf(item.likes, l => l.personId === user._id) >= 0;
}
