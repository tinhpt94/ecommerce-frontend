import React, {Component} from "react";
import {Link} from "react-router";
import $ from "jquery";
import "../../../memenu";
import FilterStore from "../../../stores/FilterStore";
import FilterAction from "../../../actions/FilterAction";
import MenuService from "../../../services/MenuService";
import MenuStore from "../../../stores/MenuStore";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.onSearchChange = this.onSearchChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _getState() {
    return {
      searchName: FilterStore.getSearchName(),
      menu: MenuStore.getMenu()
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentWillMount() {
    FilterStore.addChangeListener(this._onChange);
    MenuStore.addChangeListener(this._onChange);
  }

  onSearchChange(e) {
    this.setState({searchName: e.target.value});
    FilterAction.filterByName(e.target.value);
  }

  componentDidMount() {
    $(".memenu").memenu();
    MenuService.fetchMenu();
  }

  componentWillUnMount() {
    FilterStore.removeChangeListener(this._onChange);
    MenuStore.removeChangeListener(this._onChange);
  }

  render() {
    const menu = this.state.menu;
    const brands = menu.brands;
    const productTypes = menu.product_types;
    const madeIns = menu.made_ins;

    return (
      <div className="header-bottom">
        <div className="header">
          <div className="row">
            <div className="col-md-9 header-left">
              <div className="top-nav">
                <ul className="memenu skyblue">
                  <li className="active"><Link to="/">Home</Link></li>
                  <li className="grid"><a href="#">Menu</a>
                    <div className="mepanel">
                      <div className="row">
                        <div className="col1 me-one">
                          <h4>Brand</h4>
                          <ul>
                            {brands.length !== 0 ? brands.map((brand, index) => {
                                return <li key={index}><Link to={"/brand/" + brand.code }>{brand.brand}</Link></li>
                              }) : null}
                          </ul>
                        </div>
                        <div className="col1 me-one">
                          <h4>Product Type</h4>
                          <ul>
                            {productTypes !== 0 ? productTypes.map((type, index) => {
                                return <li key={index}><Link to={"/product-type/" + type.code }>{type.type_name}</Link>
                                </li>
                              }) : null}
                          </ul>
                        </div>
                        <div className="col1 me-one">
                          <h4>Made In</h4>
                          <ul>
                            {madeIns.length !== 0 ? madeIns.map((madeIn, index) => {
                                return <li key={index}><Link to={"/made-in/" + madeIn.code }>{madeIn.made_in}</Link>
                                </li>
                              }) : null}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
            </div>

            <div className="col-md-3 header-right">
              <div className="search-bar">
                <input type="text" placeholder="Search" value={this.state.searchName} onChange={this.onSearchChange}/>
              </div>
            </div>

            <div className="clearfix">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;