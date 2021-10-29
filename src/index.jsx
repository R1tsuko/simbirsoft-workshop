import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@csstools/normalize.css';
import App from './App';
import store from './store/store';
import './index.scss';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
