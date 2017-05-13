import Dispatcher from "../dispatcher/Dispatcher";
import MenuConstant from "../constants/MenuConstant";

export default {
  fetchMenu: menu => {
    Dispatcher.dispatch({
      actionType: MenuConstant.FETCH_MENU,
      menu: menu
    });
  }
};
