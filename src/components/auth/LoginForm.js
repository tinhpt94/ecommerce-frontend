/**
 * Created by PhamTinh on 2/19/2017.
 */
import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import ValidateLogin from './ValidateLogin'
import {browserHistory} from 'react-router'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  isValid() {
    const {errors, isValid} = ValidateLogin(this.state);
    if (!isValid) {
      this.setState({
        errors: errors
      })
    }
    return isValid;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.loginRequest(this.state).then(
        () => {
          browserHistory.push("/");
        },
        ({data}) => this.setState({errors: data, isLoading: false})
      );
    }
  }

  render() {
    return(
      <form onSubmit={this.submit}>
        <h1>Sign up form</h1>

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
    )
  }
}

export default LoginForm


