import React from "react";
import ProductListComponent from "./ProductListComponent";
import NoAvailableProduct from "./NoAvailableProduct";
import ProductFilter from "./ProductFilter";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FilterSortStore from "../../stores/FilterSortStore";
import FilterSortAction from "../../actions/FilterSortAction";
import { filterByProps, sortProduct } from "./FilterSortHandler";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import GuestOrUser from "../common/GuestOrUser";

export default GuestOrUser(class ProductByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchByType(),
      searchName: FilterSortStore.getSearchName(),
      filterProps: FilterSortStore.getFilterProperties(),
      activePage: 1,
      code: this.props.params.code,
      orderBy: FilterSortStore.getOrderBy()
    };
  }

  _onChange() {
    this.setState(this._getState());
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

  componentWillUnmount() {
    FilterSortAction.removeSortFilters();
    ProductStore.removeChangeListener(this._onChange);
    FilterSortStore.removeChangeListener(this._onChange);
  }

  handleChange = (event, index, value) =>
    this.setState({
      orderBy: value
    });

  render() {
    const products = this.state.products;
    const searchName = this.state.searchName;
    const sortedProduct = sortProduct.bind(this)(this.state.orderBy, products);
    const filterProps = this.state.filterProps;
    const filterByName = sortedProduct.filter(function(product) {
      const productName = product.name === undefined || product.name === ""
        ? ""
        : product.name;
      return String(productName)
        .toLowerCase()
        .includes(searchName.trim().toLowerCase());
    });
    const filteredProduct = filterByProps.bind(this)(filterByName, filterProps);
    return (
      <div className="row">
        <div className="col-md-12">
          <DropDownMenu value={this.state.orderBy} onChange={this.handleChange}>
            <MenuItem value={"newest"} primaryText="Hàng mới nhập" />
            <MenuItem value={"discount"} primaryText="Giảm giá nhiều nhất" />
            <MenuItem
              value={"price-low-to-high"}
              primaryText="Giá: Từ thấp đến cao"
            />
            <MenuItem
              value={"price-high-to-low"}
              primaryText="Giá: Từ cao đến thấp"
            />
            <MenuItem value={"name-a-z"} primaryText="Sắp xếp theo tên: A-Z" />
          </DropDownMenu>
        </div>
        {filteredProduct.length > 0
          ? <div className="col-md-9">
              <ProductListComponent
                productList={filteredProduct}
                {...this.props}
                cols={3}
              />
            </div>
          : <NoAvailableProduct />}

        {filteredProduct.length > 0
          ? <div className="col-md-3">
              <ProductFilter productList={filteredProduct} />
            </div>
          : <div className="col-md-3 col-md-offset-9">
              <ProductFilter productList={filteredProduct} />
            </div>}
      </div>
    );
  }
})
