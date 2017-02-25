import BaseStore from './BaseStore'
import LoginConstant from '../constants/LoginConstant'

class LoginStore extends BaseStore {
  constructor() {
    super();
    this.userLoggedIn = null;
    this.error = null;
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case LoginConstant.LOGIN_USER:
        this.userLoggedIn = action.user;
        this.error = null;
        this.emitChange();
        break;
      case LoginConstant.LOGOUT:
        this.userLoggedIn = null;
        this.emitChange();
        break;
      case LoginConstant.ERROR:
        this.error = action.errors;
        this.emitChange();
        break;
      default :
    }
  }

  loggedInUser() {
    return this.userLoggedIn
  }

  LoginError() {
    return this.error
  }


}

const loginStore = new LoginStore();

export default loginStore;
