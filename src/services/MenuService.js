import MenuAction from "../actions/MenuAction";
import MenuConstant from "../constants/MenuConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class MenuService {
  fetchMenu() {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: MenuConstant.URL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        switch (response.status) {
          case 200:
            MenuAction.fetchMenu(response.data);
            break;

          default:
            break;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default new MenuService();
