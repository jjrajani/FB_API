import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { App } from './components';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }
};

registerServiceWorker();
