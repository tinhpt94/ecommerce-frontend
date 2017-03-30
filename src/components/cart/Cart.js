import React, {Component} from "react";
import AuthenticatedUser from "../common/AuthenticatedUser";
import {Table} from "react-bootstrap";
import CartStore from "../../stores/CartStore";
import CartAction from "../../actions/CartAction";
import {FormattedNumber} from "react-intl";
import {Link} from "react-router";

export default AuthenticatedUser(class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddMoreClick = this.onAddMoreClick.bind(this);
    this.onSubtractClick = this.onSubtractClick.bind(this);
  }

  _getState() {
    return ({
      products: CartStore.getProducts(),
      totalPrice: CartStore.getTotalPrice(),
      totalProduct: CartStore.getTotalProduct(),
      confirmDelete: false
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    CartStore.addChangeListener(this._onChange);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this._onChange);
  }

  onAddMoreClick(product) {
    CartAction.editItemQuantity(parseInt(product.quantity) + 1, product.code);
  }

  onSubtractClick(product) {
    CartAction.editItemQuantity(parseInt(product.quantity) - 1, product.code);
  }

  onInputChange(e, code) {
    CartAction.editItemQuantity(e.target.value, code);
  }

  onRemoveProduct(product) {
    CartAction.removeFromCart(product);
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
                <th style={{width: "10%"}}>#</th>
                <th style={{width: "40%"}}>Sản phẩm</th>
                <th style={{width: "10%"}}>Đơn giá</th>
                <th style={{width: "15%"}}>Số lượng</th>
                <th style={{width: "15%"}}>Số tiền</th>
                <th style={{width: "10%"}}>Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {products.map((product, index) => {
                return <tr key={index}>
                  <td className="cart-item">{index + 1}</td>
                  <td className="cart-item"><img src={product.image_url} height={42} width={42}/> {product.name} </td>
                  <td className="cart-item"><span><FormattedNumber value={product.price}/></span></td>
                  <td className="cart-item">
                    <div className="input-group">
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button"
                              onClick={e => this.onSubtractClick.call({}, product)}>-</button>
                    </span>
                      <input type="text" className="form-control" value={product.quantity}
                             onChange={e => this.onInputChange.call({}, e, product.code)}/>
                      <span className="input-group-btn">
                      <button className="btn btn-default" type="button"
                              onClick={e => this.onAddMoreClick.call({}, product)}>+</button>
                    </span>
                    </div>
                  </td>
                  <td className="cart-item"><FormattedNumber value={product.price * product.quantity}/></td>
                  <td className="cart-item">
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button"
                              onClick={e => this.onRemoveProduct.call({}, product)}>Xoá</button>
                  </span></td>
                </tr>
              })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-right">
            <label className="cart-total">Tổng tiền hàng ({this.state.totalProduct} sản phẩm): đ <FormattedNumber
              value={this.state.totalPrice}/></label>
            <Link to="/confirm-order" type="button" className="btn btn-lg btn-primary">Mua hàng</Link>
          </div>
        </div>
      </div>
    )
  }
})