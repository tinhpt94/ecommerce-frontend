/**
 * Created by PhamTinh on 2/18/2017.
 */
import React from "react";
import {browserHistory} from "react-router";
import TextFieldGroup from "../common/TextFieldGroup";
import ValidateSignUp from "./ValidateSignUp";
import SignUpService from "../../services/SignUpService";
import SignUpStore from "../../stores/SignUpStore";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.onChange = this.onChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this.submit = this.submit.bind(this)
  }

  _getState() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      name: '',
      address: '',
      phone: '',
      errors: {}
    }
  }

  _onChange() {
    this.setState(this._getState);
  }

  componentDidMount() {
    if (SignUpStore.isSuccess()) {
      browserHistory.push("/login");
    }
    SignUpStore.addChangeListener(this._onChange);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    SignUpStore.removeChangeListener(this._onChange);
  }

  isValid() {
    const {errors, isValid} = ValidateSignUp(this.state);

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
      SignUpService.signUp(this.state)
    }
  }
  render() {
    return (
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
          type="password"
          error={this.state.errors.password}
        />

        <TextFieldGroup
          field="passwordConfirmation"
          type="password"
          value={this.state.passwordConfirmation}
          label="Password Confirm"
          onChange={this.onChange}
          error={this.state.errors.passwordConfirmation}
        />

        <TextFieldGroup
          field="email"
          value={this.state.email}
          label="Email"
          onChange={this.onChange}
          error={this.state.errors.email}
        />

        <TextFieldGroup
          field="name"
          value={this.state.name}
          label="Name"
          onChange={this.onChange}
          error={this.state.errors.name}
        />

        <TextFieldGroup
          field="phone"
          value={this.state.phone}
          label="Phone"
          onChange={this.onChange}
          error={this.state.errors.phone}
        />

        <TextFieldGroup
          field="address"
          value={this.state.address}
          label="Address"
          onChange={this.onChange}
          error={this.state.errors.address}
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg pull-right">
            Sign up
          </button>
        </div>

      </form>
    )
  }
}



export default SignUpForm
