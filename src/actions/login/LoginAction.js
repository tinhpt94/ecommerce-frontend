/**
 * Created by PhamTinh on 2/19/2017.
 */
import axios from 'axios'

export function loginRequest(userData) {
  return dispatch => {
    return axios.post("http://localhost:8080/api/login", userData)
  }
}
