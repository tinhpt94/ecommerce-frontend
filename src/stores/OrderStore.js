import BaseStore from "./BaseStore";
import OrderConstant from "../constants/OrderConstant";

class OrderStore extends BaseStore {
  constructor() {
    super();
    this.orders = [];
    this.order = null;
    this.updateOrderSuccess = false;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case OrderConstant.FETCH_ALL:
        this.orders = action.orders;
        this.emitChange();
        break;
      case OrderConstant.FETCH_BY_ID:
        this.order = action.order;
        this.emitChange();
        break;
      case OrderConstant.UPDATE_ORDER_SUCCESS:
        this.updateOrderSuccess = true;
        this.order = action.order;
        this.emitChange();
        break;
      case OrderConstant.UPDATE_ORDER_ERROR:
        this.updateOrderSuccess = false;
        this.emitChange();
        break;
      case OrderConstant.FETCH_BY_USER:
        this.orders = action.orders;
        this.emitChange();
        break;
      default:
        break;
    }
  }
}

export default new OrderStore()