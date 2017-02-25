import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, Link} from "react-router";
import {browserHistory} from 'react-router'
import Main from "./components/Main";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from './components/signup/SignUpPage'
import ProductPage from './components/product/Products'

let history = browserHistory;

let routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={ProductPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignUpPage}/>
  </Route>
);


ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('root'));