import React from 'react';
import QuoteComponentEntry from './quote-component-entry';

export default class QuoteAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      components: {
        0: {words: '', personId: null},
        1: {words: '', personId: null},
      },
    }
  }

  onQuoteComponentChange = (componentIdx, newPartialData) => {
    const components = Object.assign({}, this.state.components, {
        [componentIdx]: Object.assign({}, this.state.components[componentIdx], newPartialData),
      });
    if (componentIdx === parseInt(Object.keys(components).pop())) { // Last slot used, so add a new one
      components[componentIdx+1] = {words: '', personId: null};
    }

    this.setState({components});
  };

  onAddClicked = () => {
    // Only keep components that have words and an author
    // TODO: Some input validation with feedback to the user
    const components = Object.values(this.state.components).filter(comp => comp.words && comp.personId);
    
    this.props.submit({components});
  };

  render() {

    const quoteComponentEntryElems = Object.keys(this.state.components).map((quoteComponentId, idx) => (
      <QuoteComponentEntry
        key={idx}
        onComponentChange={newPartialData => this.onQuoteComponentChange(idx, newPartialData)}
        wordsPlaceholder="Quote"
        speakerPlaceholder="Person"
        people={this.props.people}
        {...this.state.components[quoteComponentId]}
      />
    ));

    return (
      <div className="sidebar quote-add">
        {quoteComponentEntryElems}
        <button onClick={this.onAddClicked}>Add</button>
      </div>
    )
  }

}