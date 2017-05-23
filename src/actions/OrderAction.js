import Dispatcher from "../dispatcher/Dispatcher";
import OrderConstant from "../constants/OrderConstant";

export default {
  fetchAll: orders => {
    Dispatcher.dispatch({
      actionType: OrderConstant.FETCH_ALL,
      orders: orders
    });
  },

  fetchById: order => {
    Dispatcher.dispatch({
      actionType: OrderConstant.FETCH_BY_ID,
      order
    });
  },

  updateOrderSuccess: order => {
    Dispatcher.dispatch({
      actionType: OrderConstant.UPDATE_ORDER_SUCCESS,
      order
    });
  },

  updateOrderError: () => {
    Dispatcher.dispatch({
      actionType: OrderConstant.UPDATE_ORDER_ERROR
    });
  },

  fetchByUser: orders => {
    Dispatcher.dispatch({
      actionType: OrderConstant.FETCH_BY_USER,
      orders
    });
  },

  fetchByDate: (orders, fromDate, toDate) => {
    Dispatcher.dispatch({
      actionType: OrderConstant.FETCH_BY_DATE,
      orders,
      fromDate,
      toDate
    });
  }
};
