import ReactDOM from "react-dom"
import React from "react"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import reducer from "./reducers"
import App from "./components/App"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
