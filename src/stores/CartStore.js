import BaseStore from "./BaseStore";
import CartConstant from "../constants/CartConstant";

class CartStore extends BaseStore {
  constructor() {
    super();
    this.products = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.subscribe(() => this.handler.bind(this));
    this.orderID = null;
  }

  handler(action) {
    switch (action.actionType) {
      case CartConstant.ADD_TO_CART:
        const addedProduct = action.product;
        let alreadyHaveProduct = this.products.filter(
          product => product.code === addedProduct.code
        );
        if (alreadyHaveProduct.length === 0) this.products.push(addedProduct);
        else {
          const productCodes = this.products.map(product => product.code);
          let existIndex;
          for (let i = 0; i < productCodes.length; i++) {
            if (productCodes[i] === addedProduct.code) existIndex = i;
          }
          this.products[existIndex].amount += addedProduct.amount;
        }
        localStorage.setItem("cartItems", JSON.stringify(this.products));
        this.emitChange();
        break;
      case CartConstant.REMOVE_FROM_CART:
        const removedProduct = action.product;
        const index = this.products.indexOf(removedProduct);
        const tempCart = this.products
          .slice(0, index)
          .concat(this.products.slice(index + 1, this.products.length));
        this.products = tempCart;
        localStorage.setItem("cartItems", JSON.stringify(this.products));
        this.emitChange();
        break;
      case CartConstant.EDIT_ITEM_QUANTITY:
        this.products = this.products.map(product => {
          let tempProduct = product;
          if (product.code === action.code) {
            tempProduct.amount = action.newAmount;
          }
          return tempProduct;
        });
        localStorage.setItem("cartItems", JSON.stringify(this.products));
        this.emitChange();
        break;
      case CartConstant.ORDER_SUCCESS:
        this.orderID = action.orderID;
        this.products = [];
        localStorage.setItem("cartItems", JSON.stringify(this.products));
        this.emitChange();
        break;
      default:
        break;
    }
  }

  getProducts() {
    return this.products;
  }

  getTotalProduct() {
    const products = this.products;
    if (products)
      return products.reduce((a, b) => {
        const value = parseInt(b.amount);
        if (!isNaN(value)) {
          return a + value;
        }
        return a;
      }, 0);
    return 0;
  }

  getTotalPrice() {
    const products = this.products;
    if (products)
      return products.reduce((a, b) => {
        const price = parseInt(b.price);
        const amount = parseInt(b.amount);
        const discount = parseInt(b.discount);
        if (!isNaN(price) && !isNaN(amount)) {
          return a + price * amount * (100 - discount) / 100;
        }
        return a;
      }, 0);
    return 0;
  }
}

export default new CartStore();
