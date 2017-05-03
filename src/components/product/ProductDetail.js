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
    const product = this.state.product;
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

              <Tabs className="margin-top-15">
                <Tab label="Thông tin chi tiết">
                  <div className="product-description">
                    <FroalaEditorView model={product.description}/>
                  </div>
                </Tab>
                <Tab label="Đánh giá">
                  <CommentForm product={product}/>
                  <CommentList comments={product.comments}/>


                </Tab>
              </Tabs>

            </div>
          }
        </div>
      </div>
    )
  }

  // get productInfo() {
  //   const product = this.state.product;
  //   if (product === null) {
  //     return <NoAvailableProduct />
  //   } else {
  //     return (
  //       <div className="product-detail">
  //
  //         <div className="row">
  //           <div className="col-md-7 single-top-left">
  //             <img className="img-responsive" src={product.image_url}/>
  //           </div>
  //
  //           <div className="col-md-5 single-top-right">
  //             <h2>{product.name}</h2>
  //
  //             {/*<StarRating name="disabled" totalStars={5} rating={this.state.product.rating} size={14} disabled={true}/>*/}
  //
  //             <div className="clearfix"></div>
  //
  //             <h3 className="item-price">{product.price}</h3>
  //
  //             <label className="control-label">Số lượng</label>
  //
  //             <div className="row">
  //               <div className="col-md-4">
  //                 <input className="form-control" type="number" value={this.state.quantity}
  //                        onChange={this.onInputChange}/>
  //               </div>
  //               <div className="col-md-6">
  //                 <button className="btn btn-danger form-control" onClick={e => this.addToCart.call()}>
  //                   <span className="icon"><i className="fa fa-shopping-cart"/></span>
  //                   <span className="text">Thêm vào giỏ hàng</span>
  //                 </button>
  //               </div>
  //             </div>
  //
  //             <div className="row">
  //               <div className="col-md-12 social-group">
  //                 <FacebookProvider appID={GlobalConstant.FACEBOOK_APP_ID}>
  //                   <Like href={window.location.toString()} colorScheme="dark" showFaces share/>
  //                 </FacebookProvider>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //
  //         <Tabs>
  //           <Tab label="Thông tin chi tiết">
  //             <div className="product-description">
  //               <FroalaEditorView model={product.description}/>
  //             </div>
  //           </Tab>
  //           <Tab label="Đánh giá">
  //             <CommentForm product={product}/>
  //             {/*<CommentList comments={product.comments}/>*/}
  //           </Tab>
  //         </Tabs>
  //
  //       </div>
  //     )
  //   }
  // }

}
