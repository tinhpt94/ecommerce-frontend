import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import ValidateLogin from "./ValidateLogin";
import LoginService from "../../services/LoginService";
import LoginStore from "../../stores/LoginStore";
import { browserHistory } from "react-router";
import RaisedButton from "material-ui/RaisedButton";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  _getState() {
    return {
      username: "",
      password: "",
      errors: {},
      errorServer: LoginStore.loginError()
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentDidMount() {
    if (LoginStore.userLoggedIn) {
      if (LoginStore.userLoggedIn.role === "MANAGER") {
        browserHistory.push("/admin");
      } else {
        browserHistory.push("/");
      }
    } else {
      browserHistory.push("/login");
    }
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  componentDidUpdate() {
    if (LoginStore.loggedInUser()) {
      if (LoginStore.loggedInUser().role === "USER") browserHistory.push("/");
      else if (LoginStore.loggedInUser().role === "MANAGER")
        browserHistory.push("/admin");
    }
  }

  isValid() {
    const { errors, isValid } = ValidateLogin(this.state);
    if (!isValid) {
      this.setState({
        errors: errors
      });
    }
    return isValid;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    if (this.isValid()) {
      LoginService.login(this.state.username, this.state.password);
    }
  }

  get errorMessage() {
    if (this.state.errorServer) {
      return (
        <div className="text-danger form-group error text-center">
          Tài khoản hoặc mật khẩu không đúng
        </div>
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.submit} className="login-form">
        <h1 className="text-center">Đăng nhập</h1>
        {this.errorMessage}
        <TextFieldGroup
          field="username"
          value={this.state.username}
          label="Tài khoản *"
          onChange={this.onChange}
          error={this.state.errors.username}
        />

        <TextFieldGroup
          field="password"
          value={this.state.password}
          label="Mật khẩu *"
          onChange={this.onChange}
          error={this.state.errors.password}
          type="password"
        />

        <div className="form-group">
          <RaisedButton
            label="Đăng nhập"
            fullWidth
            backgroundColor='#2196F3'
            onTouchTap={this.submit}
          />
        </div>
      </form>
    );
  }
}

export default LoginForm;
