import CartConstant from "../constants/CartConstant";
import Dispatcher from "../dispatcher/Dispatcher";

export default {
  addToCart: product => {
    Dispatcher.dispatch({
      actionType: CartConstant.ADD_TO_CART,
      product: product
    });
  },
  removeFromCart: product => {
    Dispatcher.dispatch({
      actionType: CartConstant.REMOVE_FROM_CART,
      product: product
    });
  },
  editItemQuantity: (newAmount, code) => {
    Dispatcher.dispatch({
      actionType: CartConstant.EDIT_ITEM_QUANTITY,
      code: code,
      newAmount: newAmount
    });
  },
  orderSuccess: orderID => {
    Dispatcher.dispatch({
      actionType: CartConstant.ORDER_SUCCESS,
      orderID: orderID
    });
  },
  orderError: () => {
    Dispatcher.dispatch({
      actionType: CartConstant.ORDER_ERROR
    })
  }
};
