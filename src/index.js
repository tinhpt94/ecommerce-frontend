import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Main from "./components/Main";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/signup/SignUpPage";
import ProductPage from "./components/product/Products";
import ProductDetail from "./components/product/ProductDetail";
import ProductByBrand from "./components/product/ProductByBrand";
import ProductByType from "./components/product/ProductByType";
import ProductByMadeIn from "./components/product/ProductByMadeIn";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Cart from "./components/cart/Cart";
import AdminLayout from "./components/admin/AdminLayout";
import AddNewProduct from "./components/admin/AddNewProduct";
import EditProduct from "./components/admin/EditProduct";
import "./index.css";
import "./style.css";
import "./memenu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

let history = browserHistory;
let routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={ProductPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignUpPage}/>
    <Route path="/products/:code" component={ProductDetail}/>
    <Route path="/brand/:code" component={ProductByBrand}/>
    <Route path="/made-in/:code" component={ProductByMadeIn}/>
    <Route path="/product-type/:code" component={ProductByType}/>
    <Route path="/cart" component={Cart}/>
    <Route path="/confirm-order" component={ConfirmOrder}/>
      <Route path="/admin">
          <IndexRoute component={AdminLayout}/>

      </Route>
      <Route path="/product/new" component={AddNewProduct}/>
      <Route path="/products/:code/edit" component={EditProduct}/>
  </Route>
);


ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('root'));