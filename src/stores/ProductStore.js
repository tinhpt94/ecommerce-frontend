import BaseStore from './BaseStore'
import ProductConstant from '../constants/ProductConstant'

class ProductStore extends BaseStore {
  constructor() {
    super();
    this.products = null;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case ProductConstant.FETCH_ALL:
        this.products = action.products;
        this.emitChange();
        break;
      default :
        break;
    }
  }

  fetchAll() {
    return this.products;
  }

}

const productStore = new ProductStore();

export default productStore;
