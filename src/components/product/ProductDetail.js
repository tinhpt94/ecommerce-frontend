import React, { Component } from "react";
import ReactDOM from "react-dom";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import FacebookProvider, { Like } from "react-facebook";
import GlobalConstant from "../../constants/GlobalConstant";
import CartAction from "../../actions/CartAction";
import NoAvailableProduct from "./NoAvailableProduct";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { Tabs, Tab } from "material-ui/Tabs";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import Stars from "react-stars";
import RaisedButton from "material-ui/RaisedButton";
import AddShoppingCart from "material-ui/svg-icons/action/add-shopping-cart";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import NumericInput from "react-numeric-input";
import { FormattedNumber } from "react-intl";
import { isNew } from "../../utils/date";
import { PromotionBadge, NewBadge } from "../common/Badge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
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
    };
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
    ProductStore.removeChangeListener(this._onChange);
  }

  componentDidUpdate = () => {
    ReactDOM.findDOMNode(this).scrollIntoView();
  };

  ratingChanged(newRating) {
    console.log(newRating);
  }

  validateNumber(event) {
    const evt = event ? event : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  onInputChange(quantity) {
    this.setState({
      quantity: quantity
    });
  }

  addToCart = () => {
    let addedProduct = this.state.product;
    addedProduct.amount = this.state.quantity;
    CartAction.addToCart(addedProduct);
  };

  addViewedProduct(product) {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (product && (!loggedInUser || loggedInUser.role !== "ADMIN")) {
      let viewedProducts = JSON.parse(
        localStorage.getItem("viewedProducts")
      ) || [];
      if (
        viewedProducts
          .map(viewedProduct => viewedProduct.id)
          .indexOf(product.id) === -1
      ) {
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
          {product === null
            ? <NoAvailableProduct />
            : <div className="product-detail">

                <div className="row">
                  <div className="col-md-6">
                    <img className="img-responsive" src={product.image_url} />
                  </div>

                  <div className="col-md-6">
                    <div className="product-info">
                      <div className="product-info-header">
                        <div className="product-info-header-left-section">
                          <div className="product-info-header-title">
                            <span>{product.name}</span>
                          </div>

                          <div className="product-info-header-price">
                            {product.discount > 0 &&
                              <div className="product-info-header-price-before-discount">
                                <span className="product-info-header-price-before-discount-number">
                                  <FormattedNumber
                                    value={product.price}
                                    style="currency"
                                    currency="VND"
                                  />
                                </span>
                              </div>}
                            <div className="product-info-header-real-price">
                              <FormattedNumber
                                value={
                                  product.price * (100 - product.discount) / 100
                                }
                                style="currency"
                                currency="VND"
                              />
                            </div>
                          </div>

                          <Stars
                            name="disabled"
                            totalStars={5}
                            value={this.state.product.rating}
                            size={14}
                            edit={false}
                          />
                        </div>

                        <div className="product-info-header-right-section">
                          {product.discount > 0 &&
                            <PromotionBadge discount={product.discount} />}
                          {isNew(product.created_date) && <NewBadge />}
                        </div>
                      </div>

                      <div className="product-info-body">
                        <div className="product-info-body-order-block">
                          <div className="product-info-body-row">
                            <div
                              className="product-info-body-label"
                              style={{ width: "100px" }}
                            >
                              Số lượng:
                            </div>
                            <div className="product-info-body-content">
                              <div className="product-info-body-order-quantity">
                                <div className="product-info-body-input-quantity">
                                  <NumericInput
                                    className="form-control"
                                    defaultValue={1}
                                    max={product.quantity}
                                    min={1}
                                    value={this.state.quantity}
                                    onChange={this.onInputChange}
                                  />
                                </div>
                                <div className="product-info-body-order-quantity-stock-count">
                                  <FormattedNumber value={product.quantity} />
                                  {" "}
                                  sản phẩm có sẵn
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                      {loggedInUser &&
                        <div className="product-info-footer">
                          <div className="shop-button">
                            <RaisedButton
                              icon={<AddShoppingCart />}
                              label="Thêm vào giỏ hàng"
                              labelPosition="after"
                              backgroundColor="#26A69A"
                              onTouchTap={this.addToCart}
                            />
                          </div>
                        </div>}
                    </div>

                    <div className="row">
                      <div className="col-md-12 social-group">
                        <FacebookProvider
                          appID={GlobalConstant.FACEBOOK_APP_ID}
                        >
                          <Like
                            href={window.location.toString()}
                            colorScheme="dark"
                            showFaces
                            share
                          />
                        </FacebookProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs className="margin-top-15 ">
                  <Tab label="Thông tin chi tiết">
                    <div className="product-description">
                      <FroalaEditorView model={product.description} />
                    </div>
                  </Tab>
                  <Tab label="Đánh giá">
                    {loggedInUser && <CommentForm product={product} />}
                    <CommentList comments={product.comments} />
                  </Tab>
                </Tabs>

                {viewedProducts.length > 0 &&
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Các sản phẩm đã xem</h3>
                    </div>
                    <div className="col-md-12">
                      <Slider {...settings}>
                        {viewedProducts.map((product, index) => (
                          <div key={index}>
                            <ProductItem product={product} cols={12} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>}
              </div>}
        </div>
      </div>
    );
  }
}
