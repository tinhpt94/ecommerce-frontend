import React from "react";
import ProductListComponent from "./ProductListComponent";
import NoAvailableProduct from "./NoAvailableProduct";
import ProductFilter from "./ProductFilter";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FilterStore from "../../stores/FilterStore";
import FilterAction from "../../actions/FilterAction";
import {filterByProps} from "./FilterHandler";

class ProductByMadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchByMadeIn(),
      searchName: FilterStore.getSearchName(),
      filterProps: FilterStore.getFilterProperties(),
      activePage: 1,
      code: this.props.params.code
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentDidMount() {
    ProductService.fetchByMadeIn(this.state.code);
    ProductStore.addChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(newProps) {
    ProductService.fetchByMadeIn(newProps.params.code);
  }

  componentWillUnMount() {
    FilterAction.removeFilters();
    ProductStore.removeChangeListener(this._onChange);
    FilterStore.removeChangeListener(this._onChange);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const products = this.state.products;
    const searchName = this.state.searchName;
    const filterProps = this.state.filterProps;
    const filterByName = products.filter(function (product) {
      const productName = product.name === undefined || product.name === '' ? "" : product.name;
      return (String(productName).toLowerCase().includes(searchName.trim().toLowerCase()));
    });
    const filteredProduct = filterByProps.bind(this)(filterByName, filterProps);
    if (filteredProduct.length > 0) {
      return (
        <div className="row">
          <div className="col-md-9">
            <ProductListComponent productList={filteredProduct} {...this.props}/>
          </div>

          <div className="col-md-3">
            <ProductFilter productList={filteredProduct}/>
          </div>
        </div>
      )
    } else {
      return (
        <NoAvailableProduct/>
      )
    }
  }
}

export default ProductByMadeIn
