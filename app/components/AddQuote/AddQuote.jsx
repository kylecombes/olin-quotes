import React from 'react';
import AddQuoteComponent from './AddQuoteComponent';

export default class AddQuote extends React.Component {

  constructor(props) {
    super(props);

    this.originalState = {
      components: {
        0: {words: '', personId: null},
        1: {words: '', personId: null},
      },
      context: '',
    };

    this.state = Object.assign({}, this.originalState);
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

  onContextChanged = event => this.setState({context: event.target.value});

  onAddClicked = () => {
    // Only keep components that have words and an author
    // TODO: Some input validation with feedback to the user
    const components = Object.values(this.state.components).filter(comp => comp.words && comp.personId);

    const data = {components};
    if (this.state.context) {
      data.context = this.state.context;
    }

    this.props.submit(data);
  };

  render() {

    const quoteComponentEntryElems = Object.keys(this.state.components).map((quoteComponentId, idx) => (
      <AddQuoteComponent
        key={idx}
        onComponentChange={newPartialData => this.onQuoteComponentChange(idx, newPartialData)}
        wordsPlaceholder="Quote"
        speakerPlaceholder="Person"
        people={this.props.people}
        onAddPersonClick={this.props.onAddPersonClicked}
        {...this.state.components[quoteComponentId]}
      />
    ));

    return (
      <div className="AddQuote">
        <div className="header">
          <span>Add Quote</span>
        </div>
        {quoteComponentEntryElems}
        <textarea className="context" onChange={this.onContextChanged} placeholder="Context" value={this.state.context}/>
        <button className="clear" onClick={this.props.cancel}>Discard</button>
        <button className="submit" onClick={this.onAddClicked}>Add</button>
      </div>
    )
  }

}
