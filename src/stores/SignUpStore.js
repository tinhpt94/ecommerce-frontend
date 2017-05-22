import BaseStore from "./BaseStore";
import SignUpConstant from "../constants/SignUpConstant";

class SignUpStore extends BaseStore {
  constructor() {
    super();
    this.user = null;
    this.errors = null;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case SignUpConstant.SIGN_UP:
        this.user = action.user;
        this.emitChange();
        break;
      case SignUpConstant.ERROR:
        this.errors = action.errors;
        this.emitChange();
        break;
      default:
    }
  }
}

const signUpStore = new SignUpStore();

export default signUpStore;
