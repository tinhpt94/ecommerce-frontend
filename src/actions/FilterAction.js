import Dispatcher from "../dispatcher/Dispatcher";
import FilterConstant from "../constants/FilterConstant";

export default {
  filterByName: (productName) => {
    Dispatcher.dispatch({
      actionType: FilterConstant.FILTER_NAME,
      searchName: productName
    })
  }
}