/**
 * Created by PhamTinh on 2/18/2017.
 */
import React from "react";
import {Link} from "react-router";
import LoginStore from "../../../stores/LoginStore";
import LoginService from "../../../services/LoginService";

export default class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  _getState() {
    return {
      userLoggedIn: LoginStore.loggedInUser(),
      route: window.location.pathname
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  logout(e) {
    e.preventDefault();
    LoginService.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">WATCHES</Link>
          </div>

          <div className="collapse navbar-collapse">
            {this.navBar}
          </div>
        </div>
      </nav>
    )
  }

  get navBar() {
    if (this.state.userLoggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>Welcome {this.state.userLoggedIn.name}</li>
          <li>
            <button className="btn btn-default" onClick={this.logout}>Logout</button>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      )
    }
  }

}
