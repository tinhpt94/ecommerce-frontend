/**
 * Created by PhamTinh on 2/18/2017.
 */

import { LOGIN_ATTEMPT, LOGGED_FAILED, LOGGED_SUCCESSFULLY } from '../constants/AuthActionTypes';

export function loginError(error) {
  return { error, type: LOGGED_FAILED };
}

export function loginSuccess(response) {
  return dispatch => {
    dispatch({ response, type: LOGGED_SUCCESSFULLY });
    // router.transitionTo('/dashboard');
  };
}

export function loginRequest(username, password) {
  const user = {username: username, password: password};
  return { user, type: LOGIN_ATTEMPT };
}