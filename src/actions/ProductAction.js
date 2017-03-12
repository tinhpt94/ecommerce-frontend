import Dispatcher from "../dispatcher/Dispatcher";
import ProductConstant from "../constants/ProductConstant";

export default {
  fetchAll: (products) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_ALL,
      products: products
    })
  },

  fetchByCode: (product) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_BY_ID,
      product: product
    })
  },

  fetchByCodeNotFound: () => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_BY_ID_NOT_FOUND
    })
  },

  fetchByBrand: (products) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_BY_BRAND,
      products: products
    })
  },

  fetchByType: (products) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_BY_TYPE,
      products: products
    })
  },

  fetchByMadeIn: (products) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_BY_MADEIN,
      products: products
    })
  }
}