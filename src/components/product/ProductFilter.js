import React, { Component } from "react";
import {
  filterBrand,
  filterMadeIn,
  filterProductType
} from "./FilterSortHandler";
import FilterAction from "../../actions/FilterSortAction";
import FilterStore from "../../stores/FilterSortStore";
import Checkbox from "material-ui/Checkbox";

class ProductFilter extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.checkSelected = this.checkSelected.bind(this);
    this.filterCheckBoxChange = this.filterCheckBoxChange.bind(this);
  }

  _getState() {
    return {
      filters: FilterStore.getFilterProperties()
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    FilterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener(this._onChange);
  }

  filterCheckBoxChange(e, key) {
    const name = e.target.name;
    const value = e.target.checked;
    let nextState = this.state.filters;
    value ? (nextState[key] = name) : (nextState[key] = "");
    FilterAction.filterByProperties(nextState);
  }

  checkSelected(key, name) {
    return !(this.state.filters[key] === name ||
      this.state.filters[key] === "");
  }

  render() {
    const { productList } = this.props;
    const brands = filterBrand(productList);
    const types = filterProductType(productList);
    const madeIns = filterMadeIn(productList);

    return (
      <div className="filter">
        <div>
          <h4 className="filter-title">Thương hiệu</h4>
          <ul>
            {brands.length > 0
              ? brands.map((brand, index) => {
                  return (
                    <li key={index}>
                      <Checkbox
                        onCheck={e => this.filterCheckBoxChange(e, "brand")}
                        name={brand}
                        label={brand}
                        disabled={this.checkSelected("brand", brand)}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="filter-type">
          <h4 className="filter-title">Loại sản phẩm</h4>
          <ul>
            {types.length > 0
              ? types.map((type, index) => {
                  return (
                    <li key={index}>
                      <Checkbox
                        onCheck={e => this.filterCheckBoxChange(e, "type")}
                        name={type}
                        label={type}
                        disabled={this.checkSelected("type", type)}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="filter-made-in">
          <h4 className="filter-title">Xuất xứ</h4>
          <ul>
            {madeIns.length > 0
              ? madeIns.map((madeIn, index) => {
                  return (
                    <li key={index}>
                      <Checkbox
                        onCheck={e => this.filterCheckBoxChange(e, "madeIn")}
                        name={madeIn}
                        label={madeIn}
                        disabled={this.checkSelected("madeIn", madeIn)}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div className="filter-rating">
          <h4 className="filter-title">Đánh giá</h4>
          <ul>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "rating")}
                name="1"
                label=">= 1 star"
                disabled={this.checkSelected("rating", "1")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "rating")}
                name="2"
                label=">= 2 star"
                disabled={this.checkSelected("rating", "2")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "rating")}
                name="3"
                label=">= 3 star"
                disabled={this.checkSelected("rating", "3")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "rating")}
                name="4"
                label=">= 4 star"
                disabled={this.checkSelected("rating", "4")}
              />
            </li>
          </ul>
        </div>

        <div className="filter-price">
          <h4 className="filter-title">Khoảng giá</h4>
          <ul>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "price")}
                name="100000"
                label=">= 100,000đ"
                disabled={this.checkSelected("price", "100000")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "price")}
                name="200000"
                label=">= 200,000đ"
                disabled={this.checkSelected("price", "200000")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "price")}
                name="300000"
                label=">= 300,000đ"
                disabled={this.checkSelected("price", "300000")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "price")}
                name="400000"
                label=">= 400,000đ"
                disabled={this.checkSelected("price", "400000")}
              />
            </li>
          </ul>
        </div>

        <div className="filter-discount">
          <h4 className="filter-title">Giảm giá</h4>
          <ul>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "discount")}
                name="10"
                label=">= 10%"
                disabled={this.checkSelected("discount", "10")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "discount")}
                name="20"
                label=">= 20%"
                disabled={this.checkSelected("discount", "20")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "discount")}
                name="30"
                label=">= 30%"
                disabled={this.checkSelected("discount", "30")}
              />
            </li>
            <li>
              <Checkbox
                onCheck={e => this.filterCheckBoxChange(e, "discount")}
                name="40"
                label=">= 40%"
                disabled={this.checkSelected("discount", "40")}
              />
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default ProductFilter;
