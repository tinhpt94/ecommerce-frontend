import BaseStore from "./BaseStore";
import OrderConstant from "../constants/OrderConstant";
import moment from "moment";

class OrderStore extends BaseStore {
  constructor() {
    super();
    this.orders = [];
    this.order = null;
    this.updateOrderSuccess = false;
    this.fromDate = moment().startOf("month").toDate();
    this.toDate = moment().toDate();
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case OrderConstant.FETCH_ALL:
        this.orders = action.orders;
        this.emitChange();
        break;
      case OrderConstant.FETCH_BY_DATE:
        this.orders = action.orders;
        this.fromDate = action.fromDate;
        this.toDate = action.toDate;
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

  getCurrentOrder() {
    return this.order;
  }
}

export default new OrderStore();
