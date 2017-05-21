import React from "react";
import { browserHistory } from "react-router";
import LoginStore from "../../stores/LoginStore";
import LoginService from "../../services/LoginService";
import LoginAction from "../../actions/LoginAction";
import GlobalConstant from "../../constants/GlobalConstant";

export default ComposedComponent => {
  return class AuthenticatedUser extends React.Component {
    checkAuthen() {
      LoginService.isAuthenticated();
    }

    constructor() {
      super();
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
    }

    _getState() {
      return {
        userLoggedIn: LoginStore.loggedInUser()
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      LoginStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
      this.checkAuthen();
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this._onChange);
    }

    componentDidUpdate() {
      if (
        this.state.userLoggedIn &&
        this.state.userLoggedIn.role === GlobalConstant.MANAGER
      ) {
        LoginAction.logout();
      }
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          userLoggedIn={this.state.userLoggedIn}
        />
      );
    }
  };
};
