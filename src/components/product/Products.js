import React from "react";
import NoAvailableProduct from "./NoAvailableProduct";
import ProductListComponent from "./ProductListComponent";
import {DropdownButton, MenuItem} from "react-bootstrap";
import ProductFilter from "./ProductFilter";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FilterSortStore from "../../stores/FilterSortStore";
import {filterByProps, sortProduct} from "./FilterSortHandler";
import FilterSortAction from "../../actions/FilterSortAction";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.titleDropDownOrder = this.titleDropDownOrder.bind(this);
    this.onSelectedOrder = this.onSelectedOrder.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchAll(),
      searchName: FilterSortStore.getSearchName(),
      filterProps: FilterSortStore.getFilterProperties(),
      activePage: 1,
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
    ProductService.fetchAll();
  }

  componentWillUnMount() {
    FilterSortAction.removeFilters();
    FilterSortStore.removeChangeListener(this._onChange);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  titleDropDownOrder() {
    switch (this.state.orderBy) {
      case "newest":
        return "Hàng mới nhập";
        break;
      case "discount":
        return "Giảm giá nhiều nhất";
        break;
      case "price-low-to-high":
        return "Giá: Từ thấp đến cao";
        break;
      case "price-high-to-low":
        return "Giá: Từ cao đến thấp";
        break;
      case "name-a-z":
        return "Sắp xếp theo tên: A-Z";
        break;
      default:
        return "Sắp xếp sản phẩm";
        break;
    }
  }

  onSelectedOrder(orderBy) {
    this.setState({
      orderBy: orderBy
    })
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
            <ProductFilter productList={filterByName}/>
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

export default Products
