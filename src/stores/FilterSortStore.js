import BaseStore from "./BaseStore";
import FilterSortConstant from "../constants/FilterSortConstant";

class FilterSortStore extends BaseStore {
  constructor() {
    super();
    this.searchName = "";
    this.properties = this.getDefaultFilter();
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
      case FilterSortConstant.REMOVE_FILTER_SORT:
        this.properties = this.getDefaultFilter();
        this.orderBy = "price-low-to-high";
        this.emitChange();
        break;
      case FilterSortConstant.ORDER_CHANGE:
        this.orderBy = action.orderBy;
        this.emitChange();
        break;
      default:
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

  getDefaultFilter() {
    return {
      brand: "",
      type: "",
      madeIn: "",
      price: "",
      discount: "",
      rating: ""
    };
  }
}

export default new FilterSortStore();
