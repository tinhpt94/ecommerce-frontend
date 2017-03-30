import BaseStore from "./BaseStore";
import ProductConstant from "../constants/ProductConstant";

class ProductStore extends BaseStore {
  constructor() {
    super();
    this.products = [];
    this.selectedProduct = null;
    this.productByBrand = [];
    this.productByType = [];
    this.productByMadeIn = [];
    this.addNewSuccess = false;
    this.editSuccess = false;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case ProductConstant.FETCH_ALL:
        this.products = action.products;
        this.emitChange();
        break;
      case ProductConstant.FETCH_BY_ID:
        this.selectedProduct = action.product;
        this.emitChange();
        break;
      case ProductConstant.FETCH_BY_ID_NOT_FOUND:
        this.selectedProduct = null;
        this.emitChange();
        break;
      case ProductConstant.FETCH_BY_BRAND:
        this.productByBrand = action.products;
        this.emitChange();
        break;
      case ProductConstant.FETCH_BY_TYPE:
        this.productByType = action.products;
        this.emitChange();
        break;
      case ProductConstant.FETCH_BY_MADEIN:
        this.productByMadeIn = action.products;
        this.emitChange();
        break;
      case ProductConstant.ADD_NEW_SUCCESS:
        this.addNewSuccess = true;
        this.emitChange();
        break;
      case ProductConstant.ADD_NEW_ERROR:
        this.addNewSuccess = false;
        this.emitChange();
        break;
      case ProductConstant.EDIT_SUCCESS:
        this.editSuccess = true;
        this.emitChange();
        break;
      case ProductConstant.EDIT_ERROR:
        this.editSuccess = false;
        this.emitChange();
        break;
      case ProductConstant.DELETE:
        const index = this.products.indexOf(action.product);
        const tempProducts = this.products.slice(0, index).concat(this.products.slice(index + 1, this.products.length));
        this.products = tempProducts;
        this.emitChange();
        break;
      default :
        break;
    }
  }

  fetchAll() {
    return this.products;
  }

  fetchByType() {
    return this.productByType;
  }

  fetchByBrand() {
    return this.productByBrand;
  }

  fetchByMadeIn() {
    return this.productByMadeIn;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

}

const productStore = new ProductStore();

export default productStore;
