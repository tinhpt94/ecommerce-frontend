import React, {Component} from "react";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FacebookProvider, {Like} from "react-facebook";
import GlobalConstant from "../../constants/GlobalConstant";
import CartAction from "../../actions/CartAction";
import NoAvailableProduct from "./NoAvailableProduct";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import {Tabs, Tab} from "material-ui/Tabs";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import Stars from "react-stars";
import RaisedButton from "material-ui/RaisedButton";
import AddShoppingCart from "material-ui/svg-icons/action/add-shopping-cart";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import NumericInput from "react-numeric-input";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SLIDER_RESPONSIVE = [
  {breakpoint: 768, settings: {slidesToShow: 3}},
  {breakpoint: 1024, settings: {slidesToShow: 5}}];

export default class ProductDetail extends Component {
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
      quantity: 1,
      title: "",
      content: "",
      rating: 5,
      errors: {}
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

  componentWillUnmount() {
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

  onInputChange(quantity) {
    this.setState({
      quantity: quantity
    })
  }

  addToCart() {
    let addedProduct = this.state.product;
    addedProduct.quantity = this.state.quantity;
    CartAction.addToCart(addedProduct);
  }

  addViewedProduct(product) {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (product && (loggedInUser.role !== 'ADMIN' || !loggedInUser)) {
      let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
      if (viewedProducts.map(viewedProduct => viewedProduct.id).indexOf(product.id) === -1) {
        viewedProducts.push(product);
      }
      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    }
  }

  render() {
    const product = this.state.product;
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.addViewedProduct(product);
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts"));
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      pauseOnHover: true
    };

    return (
      <div className="single">
        <div className="single-main">
          {product === null ? <NoAvailableProduct /> :
            <div className="product-detail">

              <div className="row">
                <div className="col-md-7 single-top-left">
                  <img className="img-responsive" src={product.image_url}/>
                </div>

                <div className="col-md-5 single-top-right">
                  <h2>{product.name}</h2>

                  <Stars name="disabled" totalStars={5} value={this.state.product.rating} size={14} edit={false}/>

                  <div className="clearfix"></div>

                  <h3 className="item-price">{product.price}</h3>

                  <label className="control-label">Số lượng</label>

                  <div className="row">
                    <div className="col-md-4">
                      <NumericInput className="form-control"
                                    defaultValue={1}
                                    max={product.quantity}
                                    min={1} value={this.state.quantity}
                                    onChange={this.onInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <RaisedButton
                        icon={<AddShoppingCart />}
                        label="Thêm vào giỏ hàng"
                        labelPosition="after"
                        backgroundColor="#F44336"
                        onTouchTap={this.addToCart}
                      />

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

              <Tabs className="margin-top-15 ">
                <Tab label="Thông tin chi tiết">
                  <div className="product-description">
                    <FroalaEditorView model={product.description}/>
                  </div>
                </Tab>
                <Tab label="Đánh giá">
                  {loggedInUser && <CommentForm product={product}/>}
                  <CommentList comments={product.comments}/>
                </Tab>
              </Tabs>

              {viewedProducts.length > 0 &&
              <div className="row">
                <div className="col-md-12">
                  <h3>Các sản phẩm đã xem</h3>
                </div>
                <div className="col-md-12">
                  <Slider {...settings}>
                    {viewedProducts.map((product, index) =>
                      (
                        <div key={index}><ProductItem product={product} cols={12}/></div>
                      )
                    )}
                  </Slider>
                </div>
              </div>}
            </div>
          }
        </div>
      </div>
    )
  }
}