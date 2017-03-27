import BaseStore from "./BaseStore";
import FilterSortConstant from "../constants/FilterSortConstant";
import {LOCATION_CHANGE} from "react-router-redux";

const DEFAULT_FILTER = {
  brand: "",
  type: "",
  madeIn: "",
  price: "",
  discount: "",
  rating: ""
};


class FilterSortStore extends BaseStore {
  constructor() {
    super();
    this.searchName = "";
    this.properties = DEFAULT_FILTER;
    this.orderBy = "price-low-to-high";
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case FilterSortConstant.FILTER_NAME:
        this.searchName = action.searchName;
        this.emitChange();
        break;
      case FilterSortConstant.FILTER_BY_PROPERTIES:
        this.properties = action.properties;
        this.emitChange();
        break;
      case FilterSortConstant.REMOVE_FILTER:
        this.properties = DEFAULT_FILTER;
        this.emitChange();
        break;
      case FilterSortConstant.ORDER_CHANGE:
        this.orderBy = action.orderBy;
        this.emitChange();
        break;
      case LOCATION_CHANGE:
        this.properties = DEFAULT_FILTER;
        this.orderBy = "price-low-to-high";
        this.searchName = "";
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

  getOrderBy() {
    return this.orderBy;
  }
}

export default new FilterSortStore()