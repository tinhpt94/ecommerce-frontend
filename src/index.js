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
import AddNewProduct from "./components/admin/product/AddNewProduct";
import EditProduct from "./components/admin/product/EditProduct";
import ProductList from "./components/admin/product/ProductList";
import CompareProduct from "./components/product/CompareProduct";
import OrderList from "./components/admin/order/OrderList";
import OrderDetail from "./components/admin/order/OrderDetail";
import Report from "./components/admin/order/Report";
import UserLayOut from "./components/user/UserLayout";
import UserOrderList from "./components/order/OrderList";
import OrderDetailUser from "./components/order/OrderDetail";
import Home from "./components/home/Home";
import "./index.css";
import "./style.css";
import "./memenu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

let history = browserHistory;

const router =
  <Router history={history}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="products" component={ProductPage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="signup" component={SignUpPage}/>
      <Route path="/products/:code" component={ProductDetail}/>
      <Route path="/brand/:code" component={ProductByBrand}/>
      <Route path="/made-in/:code" component={ProductByMadeIn}/>
      <Route path="/product-type/:code" component={ProductByType}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/confirm-order" component={ConfirmOrder}/>
      <Route path="/compare-product" component={CompareProduct}/>

      <Route path="user" component={UserLayOut}>
        <IndexRoute components={UserOrderList}/>
        <Route path={"orders"} component={UserOrderList}/>
        <Route path="orders/:orderId" component={OrderDetailUser} />
      </Route>
    </Route>

    <Route path="/admin" component={AdminLayout}>
      <IndexRoute component={ProductList}/>
      <Route path="/admin/products/new" component={AddNewProduct}/>
      <Route path="/admin/products/:code" component={EditProduct}/>
      <Route path="/admin/products" component={ProductList}/>
      <Route path="/admin/orders" component={OrderList}/>
      <Route path="/admin/orders/:orderId" component={OrderDetail}/>
      <Route path="/admin/report" component={Report}/>
    </Route>
  </Router>;


ReactDOM.render(router, document.getElementById('root'));