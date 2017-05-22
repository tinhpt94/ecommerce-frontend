import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Stars from "react-stars";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import AddShoppingCart from "material-ui/svg-icons/action/add-shopping-cart";
import { FormattedNumber } from "react-intl";
import CartAction from "../../actions/CartAction";

export default class CompareProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

    this._onChange = this._onChange.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  _getState() {
    return {
      productList: ProductStore.fetchAll(),
      products: []
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    ProductService.fetchAll();
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  addToCart(product) {
    product.quantity = 1;
    CartAction.addToCart(product);
  }

  onSelectProduct(product) {
    const newProducts = this.state.products;
    newProducts.push(product);
    this.setState({
      products: newProducts
    });
  }

  onRemoveProduct(product) {
    const index = this.state.products.indexOf(product);
    const newProducts = this.state.products
      .slice(0, index)
      .concat(this.state.products.slice(index + 1));
    this.setState({
      products: newProducts
    });
  }

  handleUpdateInput = value => {
    this.onSelectProduct(value.valueKey);
  };

  filter = (searchText, key) => {
    return searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  }

  render() {
    const products = this.state.products;
    const dataSource = this.state.productList
      ? this.state.productList.map(product => {
          return {
            textKey: product.name,
            valueKey: product
          };
        })
      : undefined;

    const dataSourceConfig = {
      text: "textKey",
      value: "valueKey"
    };

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    return (
      <Table responsive className="compare-product">
        <thead>
          <tr>
            <th style={{ width: "20%" }} />
            <th style={{ width: "40%" }}>
              {dataSource &&
                products.length === 0 &&
                <AutoComplete
                  hintText="Nhập tên sản phẩm"
                  dataSource={dataSource}
                  onNewRequest={this.handleUpdateInput}
                  dataSourceConfig={dataSourceConfig}
                  filter={this.filter}
                />}
              {products.length > 0 &&
                <img className="img-responsive" src={products[0].image_url} />}
            </th>
            <th style={{ width: "40%" }}>
              {dataSource &&
                products.length < 2 &&
                <AutoComplete
                  hintText="Nhập tên sản phẩm"
                  dataSource={dataSource}
                  onNewRequest={this.handleUpdateInput}
                  dataSourceConfig={dataSourceConfig}
                  filter={this.filter}
                />}
              {products.length > 1 &&
                <img className="img-responsive" src={products[1].image_url} />}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Tên sản phẩm</td>
            {products.length > 0 ? <td>{products[0].name}</td> : <td />}
            {products.length > 1 ? <td>{products[1].name}</td> : <td />}
          </tr>
          <tr>
            <td>Đơn giá</td>
            {products.length > 0
              ? <td>
                  <FormattedNumber
                    value={products[0].price}
                    style="currency"
                    currency="VND"
                  />
                </td>
              : <td />}
            {products.length > 1
              ? <td>
                  <FormattedNumber
                    value={products[1].price}
                    style="currency"
                    currency="VND"
                  />
                </td>
              : <td />}
          </tr>
          <tr>
            <td>Xuất xứ</td>
            {products.length > 0
              ? <td>{products[0].made_in.made_in}</td>
              : <td />}
            {products.length > 1
              ? <td>{products[1].made_in.made_in}</td>
              : <td />}
          </tr>
          <tr>
            <td>Thương hiệu</td>
            {products.length > 0 ? <td>{products[0].brand.brand}</td> : <td />}
            {products.length > 1 ? <td>{products[1].brand.brand}</td> : <td />}
          </tr>
          <tr>
            <td>Giảm giá</td>
            {products.length > 0 ? <td>{products[0].discount} %</td> : <td />}
            {products.length > 1 ? <td>{products[1].discount} %</td> : <td />}
          </tr>
          <tr>
            <td>Đánh giá</td>
            {products.length > 0
              ? <td>
                  <Stars
                    count={5}
                    size={24}
                    color2={"#ffd700"}
                    value={products[0].rating}
                    edit={false}
                  />
                </td>
              : <td />}
            {products.length > 1
              ? <td>
                  <Stars
                    count={5}
                    size={24}
                    color2={"#ffd700"}
                    value={products[1].rating}
                    edit={false}
                  />
                </td>
              : <td />}
          </tr>

          <tr>
            <td />
            {loggedInUser &&
              products[0] &&
              <td>
                <RaisedButton
                  primary={true}
                  icon={<AddShoppingCart />}
                  label="Thêm vào giỏ hàng"
                  labelPosition="after"
                  onTouchTap={this.addToCart(products[0])}
                />
              </td>}
            {loggedInUser &&
              products[1] &&
              <td>
                <RaisedButton
                  primary={true}
                  icon={<AddShoppingCart />}
                  label="Thêm vào giỏ hàng"
                  labelPosition="after"
                  onTouchTap={this.addToCart(products[1])}
                />
              </td>}
          </tr>
        </tbody>
      </Table>
    );
  }
}
