import {
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
