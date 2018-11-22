import React from 'react';
import Autosuggest from 'react-autosuggest';

export default class QuoteAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      authorId: null,
      personInputValue: '',
      suggestions: [],
    }
  }

  onSuggestionsFetchRequested = ({ value })  => {
    const query = value.trim().toLowerCase();
    const suggestions = query.length > 0 ? this.props.people.filter(person =>
      person.displayName.toLowerCase().includes(query)
    ) : [];
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
        authorId: newValue.id,
        personInputValue: newValue.displayName,
      });
    }
  };

  getSuggestionValue = suggestion => ({id: suggestion._id, displayName: suggestion.displayName});

  renderSuggestion = suggestion => (
    <div>
      {suggestion.displayName}
    </div>
  );

  textChanged = event => this.setState({text: event.target.value});

  onAddClicked = () => this.props.submit({
      components: [{
        personId: this.state.authorId,
        words: this.state.text,
      }]
    });

  render() {
    const autosuggestInputProps = {
      placeholder: 'Attribute',
      value: this.state.personInputValue,
      onChange: this.onChange,
    };

    return (
      <div className="sidebar quote-add">
        <input type="text" placeholder="Quote" onChange={this.textChanged} />
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={autosuggestInputProps}
        />
        <button onClick={this.onAddClicked}>Add</button>
      </div>
    )
  }

}