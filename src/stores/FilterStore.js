import BaseStore from "./BaseStore";
import FilterConstant from "../constants/FilterConstant";

class FilterStore extends BaseStore {
  constructor() {
    super();
    this.searchName = "";
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case FilterConstant.FILTER_NAME:
        this.searchName = action.searchName;
        this.emitChange();
        break;
      default :
        break;
    }
  }

  getSearchName() {
    return this.searchName;
  }
}

export default new FilterStore()