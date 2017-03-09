/**
 * Created by tinhpt on 2/21/17.
 */
import React from "react";
import ProductItem from "./ProductItem";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import {Pagination} from "react-bootstrap";
import FilterStore from "../../stores/FilterStore";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchAll(),
      searchName: FilterStore.getSearchName(),
      activePage: 1
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentDidMount() {
    ProductService.fetchAll();
    ProductStore.addChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
  }

  componentWillUnMount() {
    ProductStore.removeChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const products = this.state.products;
    const searchName = this.state.searchName;
    if (products !== null) {
      let filteredProduct = products.filter(function (product) {
        const productName = product.name === undefined || product.name === '' ? "" : product.name;
        return (String(productName).toLowerCase().includes(searchName.trim().toLowerCase()));
      });

      return (
        <div id="products">
          <div className="row">
            {
              Object.keys(filteredProduct).map(productKey => {
                return <ProductItem {...this.props}
                                    key={productKey}
                                    code={filteredProduct[productKey].code}
                                    name={filteredProduct[productKey].name}
                                    price={filteredProduct[productKey].price}
                                    image={filteredProduct[productKey].image_url}
                />
              })}
          </div>

          <div className="row text-center" classID="pagination">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={20}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}/>
          </div>
        </div>
      )
    } else {
      return (
        <div id="products">
        </div>
      )
    }
  }
}

export default Products
