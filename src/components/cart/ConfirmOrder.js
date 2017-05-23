import React, { Component } from "react";
import LoginStore from "../../stores/LoginStore";
import CartStore from "../../stores/CartStore";
import CartService from "../../services/CartService";
import TextFieldGroup from "../common/TextFieldGroup";
import ValidateConfirmInfor from "./ValidateConfirmInfor";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import AuthenticatedUser from "../common/AuthenticatedUser";
import { FormattedNumber } from "react-intl";
import { browserHistory } from "react-router";
import CustomizedDialog from "../common/CustomizedDialog";
import CartAction from "../../actions/CartAction";

export default AuthenticatedUser(
  class ConfirmOrder extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this.onInputChange = this.onInputChange.bind(this);
      this._onChange = this._onChange.bind(this);
      this.submit = this.submit.bind(this);
      this.isValid = this.isValid.bind(this);
    }

    _getState() {
      const loggedInUser = LoginStore.loggedInUser();
      return {
        name: loggedInUser.name,
        phone: loggedInUser.phone,
        email: loggedInUser.email,
        address: loggedInUser.address,
        note: "",
        errors: {},
        totalPrice: CartStore.getTotalPrice(),
        products: CartStore.getProducts(),
        orderID: CartStore.orderID
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

    onInputChange(e) {
      const key = e.target.name;
      const value = e.target.value;
      this.setState({
        [key]: value
      });
    }

    isValid() {
      const { errors, isValid } = ValidateConfirmInfor(this.state);
      if (!isValid) {
        this.setState({
          errors: errors
        });
      }
      return isValid;
    }

    submit(e) {
      e.preventDefault();
      if (this.isValid()) {
        CartService.order(
          {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            email: this.state.email
          },
          this.state.totalPrice,
          this.state.note,
          this.state.products
        );
      }
    }

    redirectToProductPage = () => {
      browserHistory.push("/");
    };

    handleCloseDialog = () => {
      CartAction.orderError();
    };

    render() {
      const actions = [
        <FlatButton
          label="Đóng"
          primary={true}
          onTouchTap={this.handleCloseDialog}
        />
      ];
      const products = this.state.products;
      const orderSuccess = this.state.orderID ? true : false;
      return (
        <div className="order-confirm">
          <CustomizedDialog
            title="Thông báo"
            content="Đặt hàng thành công"
            open={orderSuccess}
            handleClose={this.handleCloseDialog}
            actions={actions}
          />
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="order-confirm-address">
                <h3 className="text-center">Thông tin giao hàng</h3>
                <TextFieldGroup
                  field="name"
                  value={this.state.name}
                  label="Họ tên"
                  onChange={this.onInputChange}
                  error={this.state.errors.name}
                />

                <TextFieldGroup
                  field="phone"
                  value={this.state.phone}
                  label="Số điện thoại"
                  onChange={this.onInputChange}
                  error={this.state.errors.phone}
                />

                <TextFieldGroup
                  field="email"
                  value={this.state.email}
                  label="Email"
                  onChange={this.onInputChange}
                  error={this.state.errors.email}
                />

                <TextFieldGroup
                  field="address"
                  value={this.state.address}
                  label="Địa chỉ"
                  onChange={this.onInputChange}
                  error={this.state.errors.address}
                />

                <TextFieldGroup
                  field="note"
                  value={this.state.note}
                  label="Lưu ý giao hàng"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              {products.length > 0 &&
                <h3 className="text-center">Sản phẩm đã đặt hàng</h3>}
              <div className="order-confirm-items">
                {products.length > 0 &&
                  products.map((product, index) => (
                    <div className="order-confirm-item" key={index}>
                      <div className="order-confirm-item-info">
                        <img
                          className="img-responsive order-confirm-item-icon"
                          src={product.image_url}
                        />
                        <div className="order-confirm-item-name">
                          {product.name}
                        </div>
                        <div className="item-quantity text-right">
                          x{product.quantity}
                        </div>
                        <div className="order-confirm-item-price">
                          {product.discount > 0 &&
                            <div className="old">
                              <FormattedNumber
                                value={product.price}
                                style="currency"
                                currency="VND"
                              />
                            </div>}
                          <div className="new">
                            <FormattedNumber
                              value={
                                product.price * (100 - product.discount) / 100
                              }
                              style="currency"
                              currency="VND"
                            />
                          </div>
                        </div>
                        <div className="order-confirm-item-total text-right">
                          Thành tiền:
                          {" "}
                          <FormattedNumber
                            value={
                              product.price *
                                product.amount *
                                (100 - product.discount) /
                                100
                            }
                            style="currency"
                            currency="VND"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="row">
            {products.length > 0 &&
              <div className="col-md-6 col-md-offset-3">
                <div className="order-confirm-footer text-right">
                  <label className="cart-total">
                    Tổng:
                    <FormattedNumber
                      value={this.state.totalPrice}
                      style="currency"
                      currency="VND"
                    />
                  </label>
                  <RaisedButton
                    secondary={true}
                    label="Đặt hàng"
                    onTouchTap={this.submit}
                  />
                </div>
              </div>}

            {products.length === 0 &&
              <div className="col-md-6 col-md-offset-3">
                <div>Không có sản phẩm nào trong giỏ hàng</div>
                <div className="order-confirm-footer text-right">
                  <RaisedButton
                    secondary={true}
                    label="Quay lại mua hàng"
                    onTouchTap={this.redirectToProductPage}
                  />
                </div>
              </div>}
          </div>
        </div>
      );
    }
  }
);
