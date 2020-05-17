import {
  ILike,
  IPerson, IQuote,
  IRootState,
} from './data/types';

const extractIdFromUrl = (urlBase: string): (string|undefined) => {
  const regexMatch = window.location.pathname.match(new RegExp(`^\\/${urlBase}\\/(\\w+)`));
  if (regexMatch) {
    return regexMatch[1];
  }
  return undefined;
};

export const getCurrentBoardId = () => extractIdFromUrl('boards');
export const getCurrentPersonId = () => extractIdFromUrl('people');
export const getCurrentQuoteId = () => extractIdFromUrl('quotes');

export function indexOf<T> (iter: Array<T>, checkFn: (item: T) => boolean): number {
  for (let i = 0; i < iter.length; ++i)
    if (checkFn(iter[i]))
      return i;
  return -1;
}

export function userLikedItem(item: {likes: ILike[]}, user: IPerson) {
  return item.likes && indexOf(item.likes, l => l.personId === user._id) >= 0;
}
