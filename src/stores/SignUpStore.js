import BaseStore from "./BaseStore";
import SignUpConstant from "../constants/SignUpConstant";

class SignUpStore extends BaseStore {
  constructor() {
    super();
    this.success = false;
    this.errors = null;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case SignUpConstant.SIGN_UP:
        this.success = action.success;
        this.emitChange();
        break;
      case SignUpConstant.ERROR:
        this.errors = action.errors;
        this.emitChange();
        break;
      default:
    }
  }

  isSuccess() {
    return this.success;
  }
}

const signUpStore = new SignUpStore();

export default signUpStore;
