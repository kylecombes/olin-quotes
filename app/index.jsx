import React from 'react';
import ReactDOM from 'react-dom';
import InfoSidebar from './containers/info-sidebar';
import MultiQuoteView from './containers/multi-quote-view';
import NavSidebar from './containers/nav-sidebar';
import { Provider } from 'react-redux';
import setupStore from './data/setup-store';
import './styles/app.scss';

const store = setupStore();

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <NavSidebar/>
        <MultiQuoteView/>
        <InfoSidebar/>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
