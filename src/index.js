import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import routes from './routes';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
