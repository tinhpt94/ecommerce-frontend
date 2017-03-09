import BaseStore from "./BaseStore";
import ProductConstant from "../constants/ProductConstant";

class ProductStore extends BaseStore {
  constructor() {
    super();
    this.products = null;
    this.selectedProduct = null;
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
      default :
        break;
    }
  }

  fetchAll() {
    return this.products;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

}

const productStore = new ProductStore();

export default productStore;
