import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

// Redux
// import { createStore } from 'redux';
import store from './redux/store';
import { Provider } from 'react-redux';

// import { reducers } from './redux/reducers';
// import { initialState } from './redux/initialState';

// const store = createStore(reducers, initialState);

// $
debugger;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

