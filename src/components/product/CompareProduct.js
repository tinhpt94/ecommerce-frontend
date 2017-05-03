import React, {Component} from "react";
import {Table} from "react-bootstrap";
import Stars from "react-stars";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import AutoComplete from "material-ui/AutoComplete";

export default class CompareProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

    this._onChange = this._onChange.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
  }

  _getState() {
    return ({
      productList: ProductStore.fetchAll(),
      products: []
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    ProductService.fetchAll()
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  onStarSelect() {

  }

  onSelectProduct(product) {
    const newProducts = this.state.products;
    newProducts.push(product);
    this.setState({
      products: newProducts
    })
  }

  onRemoveProduct(product) {
    const index = this.state.products.indexOf(product);
    const newProducts = this.state.products.slice(0, index).concat(this.state.products.slice(index + 1));
    this.setState({
      products: newProducts
    })
  }

  handleUpdateInput = (value) => {
    this.onSelectProduct(value.valueKey);
  };

  render() {
    const products = this.state.products;
    const dataSource = this.state.productList ? this.state.productList.map(product => {
          return ({
            textKey: product.name,
            valueKey: product
          })
        }
      ) : undefined;

    const dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };
    return (
      <Table responsive className="compare-product">
        <thead>
        <tr>
          <th style={{width: "20%"}}/>
          <th style={{width: "40%"}}>
            {dataSource && products.length === 0 && <AutoComplete
              hintText="Type anything"
              dataSource={dataSource}
              onNewRequest={this.handleUpdateInput}
              dataSourceConfig={dataSourceConfig}
            />}
            {products.length > 0 && <img className="img-responsive" src={products[0].image_url}/>}
          </th>
          <th style={{width: "40%"}}>
            {dataSource && products.length < 2 && <AutoComplete
              hintText="Type anything"
              dataSource={dataSource}
              onNewRequest={this.handleUpdateInput}
              dataSourceConfig={dataSourceConfig}
            />}
            {products.length > 1 && <img className="img-responsive" src={products[1].image_url}/>}
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
          {products.length > 0 ? <td>{products[0].price}</td> : <td />}
          {products.length > 1 ? <td>{products[1].price}</td> : <td />}
        </tr>
        <tr>
          <td>Xuất xứ</td>
          {products.length > 0 ? <td>{products[0].made_in.made_in}</td> : <td />}
          {products.length > 1 ? <td>{products[1].made_in.made_in}</td> : <td />}
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
          {products.length > 0 ?
            <td><Stars count={5} size={24} color2={'#ffd700'} value={products[0].rating}
                       onChange={this.onStarSelect.bind(this)}/></td> :
            <td />}
          {products.length > 1 ?
            <td><Stars count={5} size={24} color2={'#ffd700'} value={products[1].rating}
                       onChange={this.onStarSelect.bind(this)}/></td> :
            <td />}
        </tr>
        <tr>
          <td/>
          <td>
            <button className="btn btn-primary">Thêm sản phẩm vào giỏ hàng</button>
          </td>
          <td>
            <button className="btn btn-primary">Thêm sản phẩm vào giỏ hàng</button>
          </td>
        </tr>
        </tbody>
      </Table>


    )
  }
}