import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';

import Avatar from './Avatar';

import {
  IPerson,
} from '../data/types';

type Suggestion = string | IPerson;

type Props = {
  onAddPersonClick: () => any
  onPersonSelected: (person: IPerson) => any
  people: IPerson[]
  placeholder: string
};

type State = {
  suggestions: Suggestion[]
  personInputValue: string
}

export default class AutosuggestPerson extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      suggestions: [],
      personInputValue: '',
    };
  }

  onSuggestionsFetchRequested = ({ value }: ({value: string}))  => {
    const query = value.trim().toLowerCase();
    const suggestions: (string|IPerson)[] = query.length > 0 ? this.props.people.filter(person =>
      person.displayName.toLowerCase().includes(query)
    ) : [];
    // Add a button to add a person
    suggestions.push('Add person');
    this.setState({
      suggestions,
    });
  };

  onSuggestionsClearRequested = () => this.setState({suggestions: []});

  onChange = (event: any, { newValue }: ({ newValue: string })) => {
    this.setState({
      personInputValue: newValue || '',
    });
  };

  getSuggestionValue = (suggestion: Suggestion): string => typeof suggestion === 'string'
    ? ''
    : suggestion.displayName;

  onSuggestionSelected = (event: React.FormEvent, {suggestion}: ({suggestion: IPerson | string})) => {
    if (typeof suggestion !== 'string') {
      this.props.onPersonSelected(suggestion);
    }
  };

  renderSuggestion = (suggestion: string|IPerson) => typeof suggestion === 'string'
    ? (
      <div className="person-suggestion add-person" onClick={this.props.onAddPersonClick}>
        <span>Add Person</span>
      </div>
    ) : (
      <div className="person-suggestion">
        <Avatar user={suggestion}/>
        <span>{suggestion.displayName}</span>
      </div>
    );

  render() {
    const autosuggestInputProps = {
      placeholder: this.props.placeholder,
      value: this.state.personInputValue,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        inputProps={autosuggestInputProps}
      />
    )
  }

}
