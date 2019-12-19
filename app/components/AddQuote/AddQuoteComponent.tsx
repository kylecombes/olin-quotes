import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import {
  IPerson,
} from '../../data/types';

type Props = {
  onAddPersonClick: () => any
  onComponentChange: (arg0: any) => any
  people: IPerson[]
  speakerPlaceholder: string
  words: string
  wordsPlaceholder: string
};

type State = {
  suggestions: (string|IPerson)[]
  personInputValue: string
}

type Suggestion = string | IPerson;

export default class AddQuoteComponent extends React.Component<Props, State> {

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
      personInputValue: '',
    });
  };

  onSuggestionsClearRequested = () => this.setState({suggestions: []});

  onChange = (event: any, { newValue }: ({ newValue: Suggestion })) => {
    if (typeof newValue === 'string') {
      // User pressed a key on the keyboard
      this.setState({
        personInputValue: newValue || '',
      });
    } else {
      // Suggestion was selected and we've been passed an object containing the person's ID and displayName
      this.setState({
        personInputValue: newValue.displayName,
      });
      this.props.onComponentChange({personId: newValue._id});
    }
  };

  getSuggestionValue = (suggestion: Suggestion): string => typeof suggestion === 'string'
    ? ''
    : suggestion.displayName;

  renderSuggestion = (suggestion: string|IPerson) => typeof suggestion === 'string'
  ? (
    <div className="person-suggestion add-person" onClick={this.props.onAddPersonClick}>
      <span>Add Person</span>
    </div>
  ) : (
    <div className="person-suggestion">
      <img src={suggestion.avatarUrl} alt={suggestion.displayName} />
      <span>{suggestion.displayName}</span>
    </div>
  );

  wordsChanged = (event: React.ChangeEvent<HTMLInputElement>) => this.props.onComponentChange({words: event.target.value});

  render() {
    const autosuggestInputProps = {
      placeholder: this.props.speakerPlaceholder,
      value: this.state.personInputValue,
      onChange: this.onChange,
    };

    return (
      <div className="quote-add-component">
        <input
          type="text"
          placeholder={this.props.wordsPlaceholder}
          value={this.props.words}
          onChange={this.wordsChanged}
        />
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={autosuggestInputProps}
        />
      </div>
    )
  }

}
