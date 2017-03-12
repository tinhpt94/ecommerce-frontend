import React, {Component} from "react";
import {filterBrand, filterMadeIn, filterProductType} from "./FilterHandler";
import FilterAction from "../../actions/FilterAction";
import FilterStore from "../../stores/FilterStore";

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
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentDidMount() {
    FilterStore.addChangeListener(this._onChange)
  }

  componentWillUnMount() {
    FilterStore.removeChangeListener(this._onChange)
  }

  filterCheckBoxChange(e, key) {
    const name = e.target.name;
    const value = e.target.checked;
    let nextState = this.state.filters;
    value ? nextState[key] = name : nextState[key] = "";
    FilterAction.filterByProperties(nextState);
  }

  checkSelected(key, name) {
    return !(this.state.filters[key] === name || this.state.filters[key] === "");
  }

  render() {
    const {productList} = this.props;
    const brands = filterBrand(productList);
    const types = filterProductType(productList);
    const madeIns = filterMadeIn(productList);

    return (
      <div className="filter">
        <div className="filter-brand">
          <h3>Thương hiệu</h3>
          <ul>
            {brands.length > 0 ? brands.map((brand, index) => {
                return <li key={index}><label>
                  <input type="checkbox" onChange={e => this.filterCheckBoxChange(e, "brand")} name={brand}
                         disabled={this.checkSelected("brand", brand)}/> {brand}</label></li>
              }) : null}
          </ul>
        </div>
        <div className="filter-type">
          <h3>Loại sản phẩm</h3>
          <ul>
            {types.length > 0 ? types.map((type, index) => {
                return <li key={index}><label>
                  <input type="checkbox" onChange={e => this.filterCheckBoxChange(e, "type")} name={type}
                         disabled={this.checkSelected("type", type)}/> {type}</label></li>
              }) : null}
          </ul>
        </div>
        <div className="filter-made-in">
          <h3>Xuất xứ</h3>
          <ul>
            {madeIns.length > 0 ? madeIns.map((madeIn, index) => {
                return <li key={index}><label>
                  <input type="checkbox" onChange={e => this.filterCheckBoxChange(e, "madeIn")} name={madeIn}
                         disabled={this.checkSelected("madeIn", madeIn)}/> {madeIn}</label></li>
              }) : null}
          </ul>
        </div>

        <div className="filter-rating">
          <h3>Đánh giá</h3>
          <ul>
            <li><label><input type="checkbox" name="1" disabled={this.checkSelected("rating", "1")}
                              onChange={e => this.filterCheckBoxChange(e, "rating")}/> >= 1 star </label></li>
            <li><label><input type="checkbox" name="2" disabled={this.checkSelected("rating", "2")}
                              onChange={e => this.filterCheckBoxChange(e, "rating")}/> >= 2 stars </label></li>
            <li><label><input type="checkbox" name="3" disabled={this.checkSelected("rating", "3")}
                              onChange={e => this.filterCheckBoxChange(e, "rating")}/> >= 3 stars </label></li>
            <li><label><input type="checkbox" name="4" disabled={this.checkSelected("rating", "4")}
                              onChange={e => this.filterCheckBoxChange(e, "rating")}/> >= 4 stars </label></li>
          </ul>
        </div>

        <div className="filter-price">
          <h3>Khoảng giá</h3>
          <ul>
            <li><label><input type="checkbox" name="100000" disabled={this.checkSelected("price", "100000")}
                              onChange={e => this.filterCheckBoxChange(e, "price")}/> 100.000 - 200.000</label></li>
            <li><label><input type="checkbox" name="200000" disabled={this.checkSelected("price", "200000")}
                              onChange={e => this.filterCheckBoxChange(e, "price")}/> 200.000 - 300.000</label></li>
            <li><label><input type="checkbox" name="300000" disabled={this.checkSelected("price", "300000")}
                              onChange={e => this.filterCheckBoxChange(e, "price")}/> 300.000 - 400.000</label></li>
            <li><label><input type="checkbox" name="400000" disabled={this.checkSelected("price", "400000")}
                              onChange={e => this.filterCheckBoxChange(e, "price")}/> > 400.000</label></li>
          </ul>
        </div>

        <div className="filter-discount">
          <h3>Giảm giá</h3>
          <ul>
            <li><label><input type="checkbox" name="10" disabled={this.checkSelected("discount", "10")}
                              onChange={e => this.filterCheckBoxChange(e, "discount")}/> >= 10% </label></li>
            <li><label><input type="checkbox" name="20" disabled={this.checkSelected("discount", "20")}
                              onChange={e => this.filterCheckBoxChange(e, "discount")}/> >= 20% </label></li>
            <li><label><input type="checkbox" name="30" disabled={this.checkSelected("discount", "30")}
                              onChange={e => this.filterCheckBoxChange(e, "discount")}/> >= 30% </label></li>
            <li><label><input type="checkbox" name="40" disabled={this.checkSelected("discount", "40")}
                              onChange={e => this.filterCheckBoxChange(e, "discount")}/> >= 40% </label></li>
          </ul>
        </div>

      </div>
    )
  }
}

export default ProductFilter