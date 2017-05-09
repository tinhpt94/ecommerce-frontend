import React from "react";
import NoAvailableProduct from "./NoAvailableProduct";
import ProductListComponent from "./ProductListComponent";
import ProductFilter from "./ProductFilter";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FilterSortStore from "../../stores/FilterSortStore";
import {filterByProps, sortProduct} from "./FilterSortHandler";
import FilterSortAction from "../../actions/FilterSortAction";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

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

  componentWillUnmount() {
    FilterSortAction.removeSortFilters();
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

  handleChange = (event, index, value) => this.setState({
    orderBy: value
  });

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
            <DropDownMenu value={this.state.orderBy} onChange={this.handleChange}>
              <MenuItem value={"newest"} primaryText="Hàng mới nhập"/>
              <MenuItem value={"discount"} primaryText="Giảm giá nhiều nhất"/>
              <MenuItem value={"price-low-to-high"} primaryText="Giá: Từ thấp đến cao"/>
              <MenuItem value={"price-high-to-low"} primaryText="Giá: Từ cao đến thấp"/>
              <MenuItem value={"name-a-z"} primaryText="Sắp xếp theo tên: A-Z"/>
            </DropDownMenu>
          </div>

          <div className="col-md-9">
            <ProductListComponent productList={filteredProduct} {...this.props} cols={3}/>
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
