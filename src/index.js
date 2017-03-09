import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Main from "./components/Main";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import ProductPage from "./components/product/Products";
import ProductDetail from "./components/product/ProductDetail";
import "./style.css";
import "./memenu.css";
import "bootstrap/dist/css/bootstrap.min.css";

let history = browserHistory;

let routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={ProductPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignUpPage}/>
    <Route path="/products/:code" component={ProductDetail}/>
    <Route path="/brand/:code" component={}/>
    <Route path="/made-in/:code" component={}/>
    <Route path="/product-type/:code" component={}/>
  </Route>
);


ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('root'));