import React from "react";
import Stars from "react-stars";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FacebookProvider, {Like} from "react-facebook";
import GlobalConstant from "../../constants/GlobalConstant";
import CartAction from "../../actions/CartAction";
import NoAvailableProduct from "./NoAvailableProduct";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  _getState() {
    return {
      product: ProductStore.getSelectedProduct(),
      code: this.props.params.code,
      quantity: 1
    }
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    ProductService.fetchByCode(this.state.code);
  }

  componentWillUnMount() {
    ProductStore.removeChangeListener(this._onChange)
  }

  ratingChanged(newRating) {
    console.log(newRating);
  }

  validateNumber(event) {
    const evt = (event) ? event : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  };

  onInputChange(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  addToCart(e) {
    let addedProduct = this.state.product;
    addedProduct.quantity = this.state.quantity;
    CartAction.addToCart(addedProduct);
  }

  render() {
    return (
      <div className="single">
        <div className="single-main">
          {this.productInfo}
        </div>
      </div>
    )
  }

  get productInfo() {
    if (this.state.product === null) {
      return <NoAvailableProduct />
    } else {
      return (
        <div className="product-detail">

          <div className="row">
            <div className="col-md-7 single-top-left">
              <img className="img-responsive" src={this.state.product.image_url}/>
            </div>

            <div className="col-md-5 single-top-right">
              <h2>{this.state.product.name}</h2>

              <Stars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'}/>

              <div className="clearfix"></div>

              <h3 className="item-price">{this.state.product.price}</h3>

              <label className="control-label">Số lượng</label>

              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" type="number" value={this.state.quantity}
                         onChange={this.onInputChange}/>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-danger form-control" onClick={e => this.addToCart.call()}>
                    <span className="icon"><i className="fa fa-shopping-cart"/></span>
                    <span className="text">Thêm vào giỏ hàng</span>
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 social-group">
                  <FacebookProvider appID={GlobalConstant.FACEBOOK_APP_ID}>
                    <Like href={window.location.toString()} colorScheme="dark" showFaces share/>
                  </FacebookProvider>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h2 className="infor-product">Thông tin chi tiết</h2>
              <FroalaEditorView model={this.state.product.description}/>
            </div>
          </div>

        </div>
      )
    }
  }

}
