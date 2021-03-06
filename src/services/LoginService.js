import LoginAction from "../actions/LoginAction";
import LoginConstant from "../constants/LoginConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class LoginService {
  login(username, password) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: LoginConstant.URL,
      method: "POST",
      type: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        password: password
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(function(response) {
        switch (response.status) {
          case 200:
            LoginAction.loginUser(response.data);
            break;
          default:
            break;
        }
      })
      .catch(function(error) {
        if (error.response) {
          LoginAction.error(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  }

  logout() {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: LoginConstant.URL,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    }).then(function(response) {
      switch (response.status) {
        case 200:
          LoginAction.logout();
          break;
        default:
          break;
      }
    });
  }

  isAuthenticated() {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: LoginConstant.URL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(function(response) {
        switch (response.status) {
          case 200:
            LoginAction.loginUser(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              LoginAction.logout();
              break;
            case 403:
              LoginAction.logout();
              break;
            default:
              break;
          }
        } else {
          LoginAction.logout();
        }
      });
  }
}

export default new LoginService();
