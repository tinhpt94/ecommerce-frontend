import React, { Component } from "react";
import AuthenticatedManager from "../../common/AuthenticatedManager";
import ProductStore from "../../../stores/ProductStore";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddIcon from "material-ui/svg-icons/action/add-shopping-cart";
import ProductService from "../../../services/ProductService";
import ProductListComponent from "../../product/ProductListComponent";
import { browserHistory } from "react-router";
import NoAvailableProduct from "../../product/NoAvailableProduct";

export default AuthenticatedManager(
  class ProductList extends Component {
    constructor(props) {
      super(props);
      this.state = this.getState();
      this._onchange = this._onchange.bind(this);
      this.onSearchNameChange = this.onSearchNameChange.bind(this);
    }

    getState() {
      return {
        products: ProductStore.fetchAll(),
        searchName: ""
      };
    }

    _onchange() {
      this.setState(this.getState());
    }

    componentWillMount() {
      ProductStore.addChangeListener(this._onchange);
    }

    componentDidMount() {
      ProductService.fetchAll();
    }

    componentWillUnmount() {
      ProductStore.removeChangeListener(this._onchange);
    }

    onSearchNameChange(e) {
      this.setState({
        searchName: e.target.value
      });
    }

    redirectToAddScreen = () => {
      browserHistory.push("/admin/products/new");
    }

    render() {
      const products = this.state.products;
      const filteredProducts = products
        ? products.filter(product => {
            return String(product.name)
              .toLowerCase()
              .includes(this.state.searchName.trim().toLowerCase());
          })
        : undefined;
      return (
        <div className="admin-products">
          <div className="row">
            <div className="col-md-5">
              <div className="text-box search">
                <div className="icon">
                  <FontIcon className="fa fa-search" />
                </div>
                <div className="input">
                  <input
                    name="search-name"
                    className="search-input"
                    type="text"
                    value={this.state.searchName}
                    onChange={this.onSearchNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <RaisedButton
                label="Thêm mới"
                icon={<ContentAdd />}
                primary={true}
                onTouchTap={this.redirectToAddScreen}
              />
            </div>
          </div>

          {filteredProducts
            ? <ProductListComponent
                onDelete={this.onDelete}
                productList={filteredProducts}
                {...this.props}
                cols="2"
              />
            : <NoAvailableProduct />}
        </div>
      );
    }
  }
);
