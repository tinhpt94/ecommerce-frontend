import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import ValidateLogin from "./ValidateLogin";
import LoginService from "../../services/LoginService";
import LoginStore from "../../stores/LoginStore";
import { browserHistory } from "react-router";

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
      browserHistory.push("/");
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
      else if (LoginStore.loggedInUser().role === "ADMIN")
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
        <div className="text-danger form-group error">
          Login false! Plz check your password or ID.
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
          label="Username"
          onChange={this.onChange}
          error={this.state.errors.username}
        />

        <TextFieldGroup
          field="password"
          value={this.state.password}
          label="Password"
          onChange={this.onChange}
          error={this.state.errors.password}
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg pull-right">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
