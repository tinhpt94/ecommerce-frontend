import React, {Component} from "react";
import LoginStore from "../../stores/LoginStore";
import CartStore from "../../stores/CartStore";
import CartService from "../../services/CartService";
import TextFieldGroup from "../common/TextFieldGroup";
import ValidateConfirmInfor from "./ValidateConfirmInfor";
import RaisedButton from "material-ui/RaisedButton";

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
    return ({
      name: loggedInUser ? loggedInUser.name : "",
      phone: loggedInUser ? loggedInUser.phone : "",
      email: loggedInUser ? loggedInUser.email : "",
      address: loggedInUser ? loggedInUser.address : "",
      note: "",
      errors: {},
      totalPrice: CartStore.getTotalPrice(),
      products: CartStore.getProducts()
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange)
  }

  componentWillUnMount() {
    LoginStore.removeChangeListener(this._onChange)
  }

  onInputChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    })
  }

  isValid() {
    const {errors, isValid} = ValidateConfirmInfor(this.state);
    if (!isValid) {
      this.setState({
        errors: errors
      })
    }
    return isValid;
  }

  submit(e) {
    e.preventDefault();
    if (this.isValid()) {
      CartService.order({
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        email: this.state.email
      }, this.state.totalPrice, this.state.note, this.state.products)
    }
  }

  render() {
    return (
      <div className="order-confirm">
        <h3 className="text-center">Thông tin giao hàng</h3>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
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

        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-right">
            <RaisedButton secondary={true} label="Đặt hàng" onTouchTap={this.submit}/>
          </div>

        </div>
      </div>
    )
  }
}

export default ConfirmOrder;