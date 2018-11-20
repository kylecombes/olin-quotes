import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavSidebar from './sidebars/nav-sidebar';
import MultiQuoteView from './multi-quote-view';
import './public/app.css';

import './public/app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <NavSidebar/>
        <MultiQuoteView/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
