import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import ProductService from "../../../services/ProductService";
import FroalaEditor from "react-froala-wysiwyg";
import { FormGroup, FormControl, ControlLabel, Image } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import ValidateProduct from "./ValidateProduct";
import Dropzone from "react-dropzone";
import request from "superagent";
import FlatButton from "material-ui/FlatButton";
import CustomizedDialog from "../../common/CustomizedDialog";
import GlobalConstant from "../../../constants/GlobalConstant";
import ProductStore from "../../../stores/ProductStore";
import NoAvailableProduct from "../../product/NoAvailableProduct";
import ProductAction from "../../../actions/ProductAction";
import AuthenticatedManager from "../../common/AuthenticatedManager";
import MenuService from "../../../services/MenuService";
import MenuStore from "../../../stores/MenuStore";

export default AuthenticatedManager(
  class EditProduct extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this.onInputChange = this.onInputChange.bind(this);
      this.handleModalChange = this.handleModalChange.bind(this);
      this.submit = this.submit.bind(this);
      this.isValid = this.isValid.bind(this);
      this.handleCloseDialog = this.handleCloseDialog.bind(this);
      this._onchange = this._onchange.bind(this);
      this.onSelectChange = this.onSelectChange.bind(this);
    }

    _getState() {
      return {
        product: ProductStore.getSelectedProduct(),
        code: this.props.params.code,
        editSuccess: ProductStore.editSuccess,
        menu: MenuStore.getMenu(),
        errors: {}
      };
    }

    _onchange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      ProductStore.addChangeListener(this._onchange);
      MenuStore.addChangeListener(this._onchange);
    }

    componentDidMount() {
      ProductService.fetchById(this.state.code);
      MenuService.fetchMenu();
    }

    componentWillUnmount() {
      ProductStore.removeChangeListener(this._onchange);
      MenuStore.removeChangeListener(this._onchange);
    }

    onImageDrop(files) {
      this.setState({
        uploadedFile: files[0]
      });
      this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
      let upload = request
        .post(GlobalConstant.CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", GlobalConstant.CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }

        if (response.body.secure_url !== "") {
          this.setState({
            image_url: response.body.secure_url
          });
        }
      });
    }

    onInputChange(e) {
      const key = e.target.name;
      const value = e.target.type === "number"
        ? e.target.valueAsNumber
        : e.target.value;
      let newState = this.state.product;
      newState[key] = value;
      this.setState({
        product: newState
      });
    }

    onSelectChange(e) {
      const key = e.target.name;
      const value = e.target.value;
      let newState = this.state.product;
      newState[key].id = value;
      this.setState({
        product: newState
      });
    }

    handleModalChange(modal) {
      let newState = this.state.product;
      newState.description = modal;
      this.setState({
        product: newState
      });
    }

    isValid() {
      const { errors, isValid } = ValidateProduct({
        name: this.state.product.name,
        price: this.state.product.price,
        image_url: this.state.product.image_url,
        description: this.state.product.description,
        brand: this.state.product.brand.id,
        made_in: this.state.product.made_in.id,
        product_type: this.state.product.product_type.id,
        discount: this.state.product.discount,
        quantity: this.state.product.quantity,
        rating: this.state.product.rating
      });
      if (!isValid) {
        this.setState({
          errors: errors
        });
      }
      return isValid;
    }

    handleCloseDialog() {
      ProductAction.editError();
    }

    submit(e) {
      e.preventDefault();
      if (this.isValid()) {
        ProductService.edit({
          id: this.state.product.id,
          name: this.state.product.name,
          price: this.state.product.price,
          image_url: this.state.product.image_url,
          description: this.state.product.description,
          brand: this.state.product.brand.id,
          made_in: this.state.product.made_in.id,
          product_type: this.state.product.product_type.id,
          discount: this.state.product.discount,
          quantity: this.state.product.quantity,
          rating: this.state.product.rating
        });
      }
    }

    render() {
      return (
        <div className="edit-product">
          {this.productInfo}
        </div>
      );
    }

    get productInfo() {
      if (this.state.product === null) {
        return <NoAvailableProduct />;
      } else {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleCloseDialog}
          />
        ];
        const menu = this.state.menu;
        const brands = menu.brands;
        const productTypes = menu.product_types;
        const madeIns = menu.made_ins;

        return (
          <div className="product-add-new">
            <div className="row">
              <div className="col-md-6">
                <TextFieldGroup
                  field="name"
                  value={this.state.product.name}
                  label="Tên sản phẩm"
                  onChange={this.onInputChange}
                  error={this.state.errors.name}
                />
              </div>
              <div className="col-md-6">
                <TextFieldGroup
                  field="price"
                  value={this.state.product.price}
                  label="Đơn giá"
                  type="number"
                  onChange={this.onInputChange}
                  error={this.state.errors.price}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextFieldGroup
                  field="quantity"
                  value={this.state.product.quantity}
                  label="So luong"
                  type="number"
                  onChange={this.onInputChange}
                  error={this.state.errors.quantity}
                />
              </div>
              <div className="col-md-6">
                <TextFieldGroup
                  field="discount"
                  value={this.state.product.discount}
                  label="Giam gia"
                  type="number"
                  onChange={this.onInputChange}
                  error={this.state.errors.discount}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextFieldGroup
                  field="rating"
                  value={this.state.product.rating}
                  label="Danh gia"
                  type="number"
                  onChange={this.onInputChange}
                  error={this.state.errors.rating}
                />
              </div>
              <div className="col-md-6">
                <FormGroup
                  controlId="formControlsSelect"
                  className={this.state.errors.product_type ? "has-error" : ""}
                >
                  <ControlLabel>Loai san pham</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.product.product_type.id}
                    onChange={this.onSelectChange}
                    name="product_type"
                  >
                    <option value="">select</option>
                    {productTypes.map((type, index) => {
                      return (
                        <option key={index} value={type.id}>
                          {type.type_name}
                        </option>
                      );
                    })}
                  </FormControl>
                  {this.state.errors.product_type &&
                    <span className="help-block">
                      {this.state.errors.product_type}
                    </span>}
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup
                  controlId="formControlsSelect"
                  className={this.state.errors.brand ? "has-error" : ""}
                >
                  <ControlLabel>Thuong hieu</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.product.brand.id}
                    onChange={this.onSelectChange}
                    name="brand"
                  >
                    <option value="">select</option>
                    {brands.map((brand, index) => {
                      return (
                        <option key={index} value={brand.id}>
                          {brand.brand}
                        </option>
                      );
                    })}
                  </FormControl>
                  {this.state.errors.brand &&
                    <span className="help-block">
                      {this.state.errors.brand}
                    </span>}
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup
                  controlId="formControlsSelect"
                  className={this.state.errors.made_in ? "has-error" : ""}
                >
                  <ControlLabel>Xuat xu</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.product.made_in.id}
                    onChange={this.onSelectChange}
                    name="made_in"
                  >
                    <option value="">select</option>
                    {madeIns.map((madeIn, index) => {
                      return (
                        <option key={index} value={madeIn.id}>
                          {madeIn.made_in}
                        </option>
                      );
                    })}
                  </FormControl>
                  {this.state.errors.made_in &&
                    <span className="help-block">
                      {this.state.errors.made_in}
                    </span>}
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
                    <div>
                      Drop an image or click to select a file to upload.
                    </div>
                  </Dropzone>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <div>
                    {this.state.image_url === ""
                      ? null
                      : <div>
                          <Image
                            responsive
                            rounded
                            src={this.state.product.image_url}
                          />
                        </div>}
                  </div>
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <FormGroup
                  className={this.state.errors.description ? "has-error" : ""}
                >
                  <ControlLabel>Mo ta san pham</ControlLabel>
                  <FroalaEditor
                    model={this.state.product.description}
                    onModelChange={this.handleModalChange}
                  />
                  {this.state.errors.description &&
                    <span className="help-block">
                      {this.state.errors.description}
                    </span>}
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 text-right">
                <RaisedButton
                  secondary={true}
                  label="Sửa"
                  onTouchTap={this.submit}
                />
              </div>
            </div>

            <CustomizedDialog
              title="Thông báo"
              content="Sửa sản phẩm thành công"
              open={this.state.editSuccess}
              handleClose={this.handleCloseDialog}
              actions={actions}
            />

          </div>
        );
      }
    }
  }
);
