import BaseStore from "./BaseStore";
import FilterConstant from "../constants/FilterConstant";

const DEFAULT_FILTER = {
  brand: "",
  type: "",
  madeIn: "",
  price: "",
  discount: "",
  rating: ""
};

class FilterStore extends BaseStore {
  constructor() {
    super();
    this.searchName = "";
    this.properties = DEFAULT_FILTER;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case FilterConstant.FILTER_NAME:
        this.searchName = action.searchName;
        this.emitChange();
        break;
      case FilterConstant.FILTER_BY_PROPERTIES:
        this.properties = action.properties;
        this.emitChange();
        break;
      case FilterConstant.REMOVE_FILTER:
        this.properties = DEFAULT_FILTER;
        this.emitChange();
        break;
      default :
        break;
    }
  }

  getSearchName() {
    return this.searchName;
  }

  getFilterProperties() {
    return this.properties;
  }
}

export default new FilterStore()