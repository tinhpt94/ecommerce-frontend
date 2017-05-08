import React from "react";
import {Link} from "react-router";
import CustomizedDialog from "../common/CustomizedDialog";
import RaisedButton from "material-ui/RaisedButton";
import ShippingIcon from "material-ui/svg-icons/maps/local-shipping";
import Stars from "react-stars";

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleShowDialog = this.handleShowDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCloseDialog() {
    this.setState({
      showDialog: false
    })
  }

  handleShowDialog() {
    this.setState({
      showDialog: true
    })
  }

  handleDelete(product) {
    this.setState({
      showDialog: false
    });
    this.props.onDelete(product);
  }

  render() {
    const {cols, product} = this.props;
    const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : "";
    const actions = [
      <RaisedButton
        label="Xoá"
        primary={true}
        onTouchTap={e => this.handleDelete.call({}, product)}
      />
    ];
    return (
      <div className="view-product-item">
        <div className={"col-md-" + cols}>
          <Link to={role === "ADMIN" ? "/admin/products/" + product.id : "/products/" + product.code}
                className="product-item-link">
            <div className="product-item product-item-full product-item-shadow">
              <div className="product-item-cover-image">
                <div className="image-placeholder">
                  <img className="img-responsive product-item-cover-image-background" src={product.image_url}/>
                </div>
              </div>

              <div className="product-item-lower-padding">
                <div className="product-item-text-name">{product.name}</div>
                <div className="product-item-section-price">
                  <div className="product-item-current-price product-item-current-price-free-shipping">
                    {product.price}
                  </div>
                  <div className="product-item-spacer"/>
                  <ShippingIcon className="svg-icon icon-free-shipping"/>
                </div>

                <div className="product-item-section-actions">
                  <div className="product-item-likes"/>
                  <div className="product-item-gap"/>
                  <div className="product-item-comments">
                    <div className="rating-stars">
                      <Stars count={5} size={12} color2={'#ffd700'} value={product.rating} edit={false}/>
                    </div>
                  </div>
                </div>

                <div className="product-item-badge-wrapper">
                  <div className="shop-badge shop-badge-fixed-width shop-badge-new">
                    <div className="shop-badge-new-label">Mới</div>
                  </div>
                </div>
              </div>
            </div>


          </Link>
        </div>

        <CustomizedDialog title="Thông báo"
                          content={"Bạn có chắc chắn muốn xoá sản phẩm " + product.name + " ?"}
                          open={this.state.showDialog}
                          handleClose={this.handleCloseDialog}
                          actions={actions}
        />
      </div>
    )
  }
}
