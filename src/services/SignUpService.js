import SignUpAction from "../actions/SignUpAction";
import SignUpConstant from "../constants/SignUpConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class SignUpService {
  signUp(user) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: SignUpConstant.URL,
      method: "POST",
      type: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: user
    })
      .then(function(response) {
        switch (response.status) {
          case 201:
            SignUpAction.signUp(response.data);
            break;
          default:
            break;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default new SignUpService();
