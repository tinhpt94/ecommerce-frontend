import Dispatcher from '../dispatcher/Dispatcher'
import ProductConstant from '../constants/ProductConstant'

export default {
  fetchAll: (products) => {
    Dispatcher.dispatch({
      actionType: ProductConstant.FETCH_ALL,
      products: products
    })
  }
}