import React, {Component} from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import ProductStore from "../../../stores/ProductStore";
import FontIcon from "material-ui/FontIcon";
import FlatButton from "material-ui/FlatButton";
import AddIcon from "material-ui/svg-icons/action/add-shopping-cart";
import ProductService from "../../../services/ProductService";
import ProductListComponent from "../../product/ProductListComponent";
import {Link} from "react-router";
import NoAvailableProduct from "../../product/NoAvailableProduct";

export default AuthenticatedAdmin(class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onchange = this._onchange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSearchNameChange = this.onSearchNameChange.bind(this);
  }

  getState() {
    return ({
      products: ProductStore.fetchAll(),
      searchName: ""
    })
  }

  _onchange() {
    this.setState(this.getState());
  }


  componentWillMount() {
    ProductStore.addChangeListener(this._onchange)
  }

  componentDidMount() {
    ProductService.fetchAll();
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onchange)
  }

  onSearchNameChange(e) {
    this.setState({
      searchName: e.target.value
    })
  }

  onDelete(product) {
    ProductService.delete(product);
  }

  render() {
    const products = this.state.products;
    const filteredProducts = products.filter(product => {
      return (String(product.name).toLowerCase().includes(this.state.searchName.trim().toLowerCase()));
    });
    return (
      <div className="admin-products">
        <div className="row">
          <div className="col-md-5">
            <div className="text-box search">
              <div className="icon">
                <FontIcon className="fa fa-search"/>
              </div>
              <div className="input">
                <input name="search-name" className="search-input" type="text" value={this.state.searchName}
                       onChange={this.onSearchNameChange}/>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <Link to="/admin/products/new"><FlatButton label="Thêm mới" icon={<AddIcon />} primary={true}/></Link>
          </div>
        </div>

        {filteredProducts.length > 0 ?
          <ProductListComponent onDelete={this.onDelete} productList={filteredProducts} {...this.props} cols="3"/> :
          <NoAvailableProduct/>}
      </div>
    )
  }
})