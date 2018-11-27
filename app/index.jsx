import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavSidebar from './components/sidebars/nav-sidebar';
import MultiQuoteView from './containers/multi-quote-view';
import PersonAdd from './containers/person-add';
import QuoteAdd from './containers/quote-add';
import { Provider } from 'react-redux';
import setupStore from './data/setup-store';
import './styles/app.scss';

const store = setupStore();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addPersonVisible: false,
    };
  }

  onAddPersonClicked = () => this.setState({addPersonVisible: true});

  closeAddPersonPane = () => this.setState({addPersonVisible: false});

  render() {
    const addPerson = this.state.addPersonVisible
      ? <PersonAdd closeAddPersonPane={this.closeAddPersonPane}/>
      : null;

    return (
      <Provider store={store}>
        <div className="app">
          <NavSidebar/>
          <MultiQuoteView onAddPersonClicked={this.onAddPersonClicked} />
          {addPerson}
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
