import Dispatcher from "../dispatcher/Dispatcher";
import LoginConstant from "../constants/LoginConstant";

export default {
  loginUser: user => {
    let savedUser = localStorage.getItem("user");
    Dispatcher.dispatch({
      actionType: LoginConstant.LOGIN_USER,
      user: user
    });

    if (savedUser !== user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    Dispatcher.dispatch({
      actionType: LoginConstant.LOGOUT
    });
  },

  error: error => {
    Dispatcher.dispatch({
      actionType: LoginConstant.ERROR,
      error: error
    });
  }
};
