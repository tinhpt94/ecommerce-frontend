import React from "react";
import ProductListComponent from "./ProductListComponent";
import NoAvailableProduct from "./NoAvailableProduct";
import {DropdownButton, MenuItem} from "react-bootstrap";
import ProductFilter from "./ProductFilter";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FilterSortStore from "../../stores/FilterSortStore";
import FilterSortAction from "../../actions/FilterSortAction";
import {filterByProps, sortProduct} from "./FilterSortHandler";

class ProductByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchByType(),
      searchName: FilterSortStore.getSearchName(),
      filterProps: FilterSortStore.getFilterProperties(),
      activePage: 1,
      code: this.props.params.code,
      orderBy: FilterSortStore.getOrderBy()
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
    FilterSortStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    ProductService.fetchByType(this.state.code);
  }

  componentWillReceiveProps(newProps) {
    ProductService.fetchByType(newProps.params.code);
  }

  componentWillUnMount() {
    FilterSortAction.removeFilters();
    ProductStore.removeChangeListener(this._onChange);
    FilterSortStore.removeChangeListener(this._onChange);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const products = this.state.products;
    const searchName = this.state.searchName;
    const sortedProduct = sortProduct.bind(this)(this.state.orderBy, products);
    const filterProps = this.state.filterProps;
    const filterByName = sortedProduct.filter(function (product) {
      const productName = product.name === undefined || product.name === '' ? "" : product.name;
      return (String(productName).toLowerCase().includes(searchName.trim().toLowerCase()));
    });
    const filteredProduct = filterByProps.bind(this)(filterByName, filterProps);
    if (filteredProduct.length > 0) {
      return (
        <div className="row">
          <div className="col-md-12">
            <DropdownButton bsSize="small" title="Sắp xếp sản phẩm" id="dropdown-size-small">
              <MenuItem eventKey="newest" onSelect={e => this.onSelectedOrder("newest")}>Hàng mới nhập</MenuItem>
              <MenuItem eventKey="discount" onSelect={e => this.onSelectedOrder("discount")}>Giảm giá nhiều
                nhất</MenuItem>
              <MenuItem eventKey="price-low-to-high" onSelect={e => this.onSelectedOrder("price-low-to-high")}>Giá: Từ
                thấp đến
                cao</MenuItem>
              <MenuItem eventKey="price-high-to-low" onSelect={e => this.onSelectedOrder("price-high-to-low")}>Giá: Từ
                cao đến
                thấp</MenuItem>
              <MenuItem eventKey="name-a-z" onSelect={e => this.onSelectedOrder("name-a-z")}>Sắp xếp theo tên:
                A-Z</MenuItem>
            </DropdownButton>
          </div>

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

export default ProductByType
