import BaseStore from "./BaseStore";
import MenuConstant from "../constants/MenuConstant";

class MenuStore extends BaseStore {
  constructor() {
    super();
    this.menu = {
      brands: [],
      made_ins: [],
      product_types: []
    };
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case MenuConstant.FETCH_MENU:
        this.menu = action.menu;
        this.emitChange();
        break;
      default :
        break;
    }
  }

  getMenu() {
    return this.menu;
  }
}

export default new MenuStore()