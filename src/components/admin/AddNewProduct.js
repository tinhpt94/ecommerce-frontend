import React, {Component} from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import ProductService from "../../services/ProductService";
import FroalaEditor from "react-froala-wysiwyg";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import ValidateProduct from "./ValidateProduct";
import Dropzone from "react-dropzone";
import request from "superagent";
import FlatButton from "material-ui/FlatButton";
import CustomizedDialog from "../common/CustomizedDialog";
import GlobalConstant from "../../constants/GlobalConstant";
import ProductStore from "../../stores/ProductStore";

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.onInputChange = this.onInputChange.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.submit = this.submit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this._onchange = this._onchange.bind(this);
  }

  _getState() {
    return ({
      name: "",
      price: 0,
      quantity: 0,
      discount: 0,
      rating: 0,
      made_in: "",
      brand: "",
      product_type: "",
      description: "",
      image_url: "",
      addNewSuccess: ProductStore.addNewSuccess,
      errors: {}
    })
  }

  _onchange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onchange)
  }

  componentWillUnMount() {
    ProductStore.removeChangeListener(this._onchange)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(GlobalConstant.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', GlobalConstant.CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          image_url: response.body.secure_url
        });
      }
    });
  }

  onInputChange(e) {
    const key = e.target.name;
    const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    this.setState({
      [key]: value
    })
  }

  handleModalChange(modal) {
    this.setState({
      description: modal
    })
  }

  isValid() {
    const {errors, isValid} = ValidateProduct(this.state);
    if (!isValid) {
      this.setState({
        errors: errors
      })
    }
    return isValid;
  }

  handleCloseDialog() {
    this.setState({
      addNewSuccess: false
    })
  }

  submit(e) {
    e.preventDefault();
    if (this.isValid()) {
      ProductService.addNew({
        name: this.state.name,
        price: this.state.price,
        image_url: this.state.image_url,
        description: this.state.description,
        brand: this.state.brand,
        made_in: this.state.made_in,
        product_type: this.state.product_type,
        discount: this.state.discount,
        quantity: this.state.quantity,
        rating: this.state.rating
      })
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />
    ];
    return (
      <div className="product-add-new">
        <div className="row">
          <div className="col-md-6">
            <TextFieldGroup field="name" value={this.state.name} label="Tên sản phẩm" onChange={this.onInputChange}
                            error={this.state.errors.name}/>
          </div>
          <div className="col-md-6">
            <TextFieldGroup field="price" value={this.state.price} label="Đơn giá" type="number"
                            onChange={this.onInputChange} error={this.state.errors.price}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextFieldGroup field="quantity" value={this.state.quantity} label="So luong" type="number"
                            onChange={this.onInputChange} error={this.state.errors.quantity}/>
          </div>
          <div className="col-md-6">
            <TextFieldGroup field="discount" value={this.state.discount} label="Giam gia" type="number"
                            onChange={this.onInputChange} error={this.state.errors.discount}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <TextFieldGroup field="rating" value={this.state.rating} label="Danh gia" type="number"
                            onChange={this.onInputChange} error={this.state.errors.rating}/>
          </div>
          <div className="col-md-6">
            <FormGroup controlId="formControlsSelect" className={this.state.errors.product_type ? "has-error" : ""}>
              <ControlLabel>Loai san pham</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.product_type}
                           onChange={this.onInputChange} name="type">
                <option value="">select</option>
                <option value={1}>Son</option>
                <option value={2}>Quần Áo</option>
                <option value={3}>Giày dép</option>
                <option value={4}>Trang suc</option>
              </FormControl>
              {this.state.errors.product_type && <span className="help-block">{this.state.errors.product_type}</span>}
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup controlId="formControlsSelect" className={this.state.errors.brand ? "has-error" : ""}>
              <ControlLabel>Thuong hieu</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.brand}
                           onChange={this.onInputChange} name="brand">
                <option value="">select</option>
                <option value={1}>Hot Lips</option>
                <option value={2}>Christian Louboutin</option>
                <option value={3}>Colourpop</option>
                <option value={4}>Amok</option>
                <option value={5}>3CE</option>
              </FormControl>
              {this.state.errors.brand && <span className="help-block">{this.state.errors.brand}</span>}
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup controlId="formControlsSelect" className={this.state.errors.made_in ? "has-error" : ""}>
              <ControlLabel>Xuat xu</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.made_in}
                           onChange={this.onInputChange} name="made_in">
                <option value="">select</option>
                <option value={1}>Anh</option>
                <option value={2}>Mỹ</option>
                <option value={3}>Nga</option>
                <option value={4}>Hàn Quốc</option>
              </FormControl>
              {this.state.errors.made_in && <span className="help-block">{this.state.errors.made_in}</span>}
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Dropzone
                multiple={true}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}
              >
                <div>Drop an image or click to select a file to upload.</div>
              </Dropzone>
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <div>
                {this.state.image_url === '' ? null :
                  <div>
                    <p>{this.state.uploadedFile.name}</p>
                    <img className="img img-responsive img-rounded" src={this.state.image_url}/>
                  </div>}
              </div>
            </FormGroup>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <FormGroup className={this.state.errors.description ? "has-error" : ""}>
              <ControlLabel>Mo ta san pham</ControlLabel>
              <FroalaEditor model={this.state.description}
                            onModelChange={this.handleModalChange}
              />
              {this.state.errors.description && <span className="help-block">{this.state.errors.description}</span>}
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-right">
            <RaisedButton secondary={true} label="Them moi" onTouchTap={this.submit}/>
          </div>
        </div>


        <CustomizedDialog title="Thông báo"
                          content="Thêm mới sản phẩm thành công"
                          open={this.state.addNewSuccess}
                          handleClose={this.handleCloseDialog}
                          actions={actions}
        />

      </div>

    )
  }
}

export default AddNewProduct