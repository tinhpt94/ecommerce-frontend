import React, { Component } from "react";
import { Link } from "react-router";
import $ from "jquery";
import "../../../memenu";
import FilterStore from "../../../stores/FilterSortStore";
import FilterAction from "../../../actions/FilterSortAction";
import MenuService from "../../../services/MenuService";
import MenuStore from "../../../stores/MenuStore";
import ProductService from "../../../services/ProductService";
import ProductStore from "../../../stores/ProductStore";
import AutoComplete from "material-ui/AutoComplete";
import {browserHistory} from "react-router";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.onSearchChange = this.onSearchChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _getState() {
    return {
      productList: ProductStore.fetchAll(),
      menu: MenuStore.getMenu()
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
    MenuStore.addChangeListener(this._onChange);
  }

  onSearchChange(e) {
    this.setState({ searchName: e.target.value });
    FilterAction.filterByName(e.target.value);
  }

  componentDidMount() {
    $(".memenu").memenu();
    MenuService.fetchMenu();
    ProductService.fetchAll();
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
    MenuStore.removeChangeListener(this._onChange);
  }

  handleUpdateInput = value => {
    browserHistory.push("/products/" + value.valueKey.code);
  };

  filter = (searchText, key) => {
    return searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  }

  render() {
    const menu = this.state.menu;
    const brands = menu.brands;
    const productTypes = menu.product_types;
    const madeIns = menu.made_ins;

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

    return (
      <div className="header-bottom">
        <div className="header">
          <div className="row">
            <div className="col-md-9 header-left">
              <div className="top-nav">
                <ul className="memenu skyblue">
                  <li><Link to="/">Trang chủ</Link></li>
                  <li className="grid">
                    <a href="#">Danh mục sản phẩm</a>
                    <div className="mepanel">
                      <div className="row">
                        <div className="col1 me-one">
                          <h4>Thương hiệu</h4>
                          <ul>
                            {brands.length !== 0
                              ? brands.map((brand, index) => {
                                  return (
                                    <li key={index}>
                                      <Link to={"/brand/" + brand.code}>
                                        {brand.brand}
                                      </Link>
                                    </li>
                                  );
                                })
                              : null}
                          </ul>
                        </div>
                        <div className="col1 me-one">
                          <h4>Loại sản phẩm</h4>
                          <ul>
                            {productTypes !== 0
                              ? productTypes.map((type, index) => {
                                  return (
                                    <li key={index}>
                                      <Link to={"/product-type/" + type.code}>
                                        {type.type_name}
                                      </Link>
                                    </li>
                                  );
                                })
                              : null}
                          </ul>
                        </div>
                        <div className="col1 me-one">
                          <h4>Xuất xứ</h4>
                          <ul>
                            {madeIns.length !== 0
                              ? madeIns.map((madeIn, index) => {
                                  return (
                                    <li key={index}>
                                      <Link to={"/made-in/" + madeIn.code}>
                                        {madeIn.made_in}
                                      </Link>
                                    </li>
                                  );
                                })
                              : null}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="clearfix" />
            </div>

            <div className="col-md-3 header-right">
              <div className="search-bar">
                <AutoComplete
                  hintText="Nhập tên sản phẩm"
                  dataSource={dataSource}
                  onNewRequest={this.handleUpdateInput}
                  dataSourceConfig={dataSourceConfig}
                  filter={this.filter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
