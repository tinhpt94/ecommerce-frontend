import * as types from '../constants';
import Immutable from 'seamless-immutable';

const DEFAULT_AUTH = new Immutable.Map({
  username: '',
  email: '',
  role: '',
  name: '',
  phone: '',
  address: '',
  isLoggingIn: false,
  isLoggedIn: false,
  error: null
});

export default function user(state = DEFAULT_AUTH, action) {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return state.merge({
        isLoggingIn: true,
        isLoggedIn: false // Note you shouldn't store user's password in real apps
      });
    case types.LOGGED_FAILED:
      return state.merge({
        error: action.error,
        isLoggingIn: false,
        isLoggedIn: false
      });
    case types.LOGGED_SUCCESSFULLY:
      return state.merge({
        username: action.response.username,
        email: action.response.email,
        role: action.response.role,
        name: action.response.name,
        phone: action.response.phone,
        address: action.response.address,
        error: null,
        isLoggingIn: false,
        isLoggedIn: true
      });
      break;
    default:
      return state;
  }
}