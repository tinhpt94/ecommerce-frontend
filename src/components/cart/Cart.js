import React, { Component } from "react";
import AuthenticatedUser from "../common/AuthenticatedUser";
import { Table } from "react-bootstrap";
import CartStore from "../../stores/CartStore";
import CartAction from "../../actions/CartAction";
import { FormattedNumber } from "react-intl";
import { Link, browserHistory } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import RemoveShoppingCart
  from "material-ui/svg-icons/action/remove-shopping-cart";
import NumericInput from "react-numeric-input";

export default AuthenticatedUser(
  class Cart extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
    }

    _getState() {
      return {
        products: CartStore.getProducts(),
        totalPrice: CartStore.getTotalPrice(),
        totalProduct: CartStore.getTotalProduct(),
        confirmDelete: false
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      CartStore.addChangeListener(this._onChange);
    }

    componentDidMount() {}

    componentWillUnmount() {
      CartStore.removeChangeListener(this._onChange);
    }

    onQuantityChange = (newAmount, code) => {
      CartAction.editItemQuantity(newAmount, code);
    };

    onRemoveProduct(product) {
      CartAction.removeFromCart(product);
    }

    redirectToConfirm = () => {
      browserHistory.push("/confirm-order");
    }

    redirectToProductPage = () => {
      browserHistory.push("/");
    }

    render() {
      const products = this.state.products;
      return (
        <div className="cart-view">
          <div className="row">
            <div className="col-md-12">
              <Table responsive>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>#</th>
                    <th style={{ width: "30%" }}>Sản phẩm</th>
                    <th style={{ width: "10%" }}>Đơn giá</th>
                    <th style={{ width: "10%"}}>Giảm giá</th>
                    <th style={{ width: "15%" }}>Số lượng</th>
                    <th style={{ width: "15%" }}>Số tiền</th>
                    <th style={{ width: "10%" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td className="cart-item">{index + 1}</td>
                        <td className="cart-item">
                          <img src={product.image_url} height={42} width={42} />
                          {" "}
                          {product.name}
                          {" "}
                        </td>
                        <td className="cart-item">
                          <span><FormattedNumber value={product.price} /></span>
                        </td>
                        <td className="cart-item">
                          <span>{product.discount} %</span>
                        </td>
                        <td className="cart-item">
                          <NumericInput
                            className="form-control"
                            min={1}
                            max={product.quantity}
                            value={product.amount}
                            onChange={e =>
                              this.onQuantityChange(e, product.code)}
                          />
                        </td>
                        <td className="cart-item">
                          <FormattedNumber
                            value={product.price * product.amount * (100 - product.discount) / 100}
                            style="currency"
                            currency="VND"
                          />
                        </td>
                        <td className="cart-item">
                          <RaisedButton
                            backgroundColor="#F44336"
                            onTouchTap={e => this.onRemoveProduct(product)}
                            icon={<RemoveShoppingCart />}
                            label="Xoá"
                            labelPosition="after"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            {this.state.totalPrice > 0 &&
              <div className="col-md-12 text-right cart-bottom">
                <label className="cart-total">
                  Tổng tiền hàng (
                  {this.state.totalProduct}
                  {" "}
                  sản phẩm):
                  {" "}
                  <FormattedNumber
                    value={this.state.totalPrice}
                    style="currency"
                    currency="VND"
                  />
                </label>

                <RaisedButton
                  secondary={true}
                  label="Mua hàng"
                  onTouchTap={this.redirectToConfirm}
                />
              </div>}

            {this.state.totalPrice === 0 &&
              <div className="col-md-12 text-right cart-bottom">
                <RaisedButton
                  secondary={true}
                  label="Quay lại mua hàng"
                  onTouchTap={this.redirectToProductPage}
                />
              </div>}
          </div>
        </div>
      );
    }
  }
);
