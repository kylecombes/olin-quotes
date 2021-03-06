import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { store } from './data/setup-store';
import './styles/App.scss';

// Remove the #_=_ hash appended by Facebook OAuth
if (window.location.hash === '#_=_') {
  const newLoc = Object.assign({}, window.location, { hash: '' });
  history.pushState('', document.title, newLoc.pathname);
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
