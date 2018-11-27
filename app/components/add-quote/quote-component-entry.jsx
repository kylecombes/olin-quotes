import React from 'react';
import Autosuggest from 'react-autosuggest';

export default class QuoteComponentEntry extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      personInputValue: '',
    };
  }

  onSuggestionsFetchRequested = ({ value })  => {
    const query = value.trim().toLowerCase();
    const suggestions = query.length > 0 ? this.props.people.filter(person =>
      person.displayName.toLowerCase().includes(query)
    ) : [];
    // Add a button to add a person
    suggestions.push('Add person');
    this.setState({suggestions});
  };

  onSuggestionsClearRequested = () => this.setState({suggestions: []});

  onChange = (event, { newValue }) => {
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
      this.props.onComponentChange({personId: newValue.id});
    }
  };

  getSuggestionValue = suggestion => suggestion === 'Add person'
    ? ''
    : ({id: suggestion._id, displayName: suggestion.displayName});

  renderSuggestion = suggestion => suggestion === 'Add person'
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

  wordsChanged = event => this.props.onComponentChange({words: event.target.value});

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