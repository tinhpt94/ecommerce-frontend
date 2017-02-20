/**
 * Created by PhamTinh on 2/18/2017.
 */
import axios from 'axios'

export function userSignUpRequest(userData) {
  return dispatch => {
    return axios.post("http://localhost:8080/api/users", userData);
  }
}
