import Dispatcher from "../dispatcher/Dispatcher";
import FilterConstant from "../constants/FilterConstant";

export default {
  filterByName: (productName) => {
    Dispatcher.dispatch({
      actionType: FilterConstant.FILTER_NAME,
      searchName: productName
    })
  },

  filterByProperties: (properties) => {
    Dispatcher.dispatch({
      actionType: FilterConstant.FILTER_BY_PROPERTIES,
      properties: properties
    })
  },

  removeFilters: () => {
    Dispatcher.dispatch({
      actionType: FilterConstant.REMOVE_FILTER
    })
  }
}