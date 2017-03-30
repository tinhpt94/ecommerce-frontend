import React from "react";
import {Link} from "react-router";
import CustomizedDialog from "../common/CustomizedDialog";
import RaisedButton from "material-ui/RaisedButton";

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
      <div className="product-item">
        <div className={"col-md-" + cols}>
          <div className="product-main">
            <div className="img-wrap">
              {role === "ADMIN" ? <span className="delete" onClick={this.handleShowDialog}>&times;</span> : null }
              <Link to={role === "ADMIN" ? "/admin/products/" + product.id : "/products/" + product.code}>
                <img className="img-responsive" src={product.image_url}/>
              </Link>
            </div>
            <div className="product-bottom">
              <h3>{product.name}</h3>
              <h4>
                <span className="item_add">
                  <span className="item-price">{product.price}</span>
                </span>
              </h4>
            </div>
          </div>
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
