import LoginAction from "../actions/LoginAction";
import LoginConstant from "../constants/LoginConstant";
import axios from 'axios'

class LoginService {
  login(username, password) {
    axios({
      url: LoginConstant.URL,
      method: 'POST',
      type: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
        password: password
      }
    }).then(function (response) {
      switch (response.status) {
        case 200:
          LoginAction.loginUser({
            id: response.data.id,
            userame: response.data.username,
            role: response.data.role,
            email: response.data.email,
            name: response.data.name,
            phone: response.data.phone,
            address: response.data.address
          });
          break;
        case 401:
          LoginAction.loginUser({});
          break;
        case 400:
          LoginAction.error(response.error);
          break;
        default :
          break;
      }
    })
  }

  logout() {
    axios({
      url: LoginConstant.URL,
      method: 'DELETE',
      crossOrigin: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      switch (response.status) {
        case 200:
          LoginAction.logout();
          break;
        default :
          break;
      }
    })
  }
}

export default new LoginService()