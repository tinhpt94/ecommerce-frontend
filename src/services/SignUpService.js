import SignUpAction from "../actions/SignUpAction";
import SignUpConstant from "../constants/SignUpConstant";
import axios from 'axios'

class SignUpService {
  signUp(user) {
    axios({
      url: SignUpConstant.URL,
      method: 'POST',
      type: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: user
    }).then(function (response) {
      switch (response.status) {
        case 200:
          SignUpAction.signUp();
          break;
        default :
          break;
      }
    }).catch(function (error) {
      console.log(error);
    })
  }
}

export default new SignUpService()