import Dispatcher from "../dispatcher/Dispatcher";
import SignUpConstant from "../constants/SignUpConstant";

export default {
  singUp: () => {
    debugger;
    Dispatcher.dispatch({
      actionType: SignUpConstant.SIGN_UP,
      success: true
    });
  },

  error: errors => {
    Dispatcher.dispatch({
      actionType: SignUpConstant.ERROR,
      errors: errors
    });
  }
};
