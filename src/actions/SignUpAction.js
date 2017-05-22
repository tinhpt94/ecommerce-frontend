import Dispatcher from "../dispatcher/Dispatcher";
import SignUpConstant from "../constants/SignUpConstant";

export default {
  signUp: (user) => {
    Dispatcher.dispatch({
      actionType: SignUpConstant.SIGN_UP,
      user: user
    });
  },

  error: errors => {
    Dispatcher.dispatch({
      actionType: SignUpConstant.ERROR,
      errors: errors
    });
  }
};
