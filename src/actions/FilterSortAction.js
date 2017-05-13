import Dispatcher from "../dispatcher/Dispatcher";
import FilterSortConstant from "../constants/FilterSortConstant";

export default {
  filterByName: productName => {
    Dispatcher.dispatch({
      actionType: FilterSortConstant.FILTER_NAME,
      searchName: productName
    });
  },

  filterByProperties: properties => {
    Dispatcher.dispatch({
      actionType: FilterSortConstant.FILTER_BY_PROPERTIES,
      properties: properties
    });
  },

  removeSortFilters: () => {
    Dispatcher.dispatch({
      actionType: FilterSortConstant.REMOVE_FILTER_SORT
    });
  },

  orderChange: orderBy => {
    Dispatcher.dispatch({
      actionType: FilterSortConstant.ORDER_CHANGE,
      orderBy: orderBy
    });
  }
};
