import * as React from 'react';
import {
  IPerson,
  IQuoteComponentUpdate,
} from '../../data/types';
import AutosuggestPerson from '../AutosuggestPerson';

type Props = {
  onAddPersonClick: () => any
  onComponentChange: (arg0: IQuoteComponentUpdate) => any
  people: IPerson[]
  speakerPlaceholder: string
  content: string
  contentPlaceholder: string
};

export default (props: Props) => {
  const wordsChanged = (event: React.ChangeEvent<HTMLInputElement>) => props.onComponentChange({content: event.target.value});
  const personSelected = (p: IPerson) => props.onComponentChange({personId: p._id});

  return (
    <div className="quote-add-component">
      <input
        type="text"
        placeholder={props.contentPlaceholder}
        value={props.content}
        onChange={wordsChanged}
      />
      <AutosuggestPerson
        onAddPersonClick={props.onAddPersonClick}
        onPersonSelected={personSelected}
        people={props.people}
        placeholder={props.speakerPlaceholder}
      />
    </div>
  );

}
