import React from "react";
import {Link} from "react-router";
import LoginStore from "../../../stores/LoginStore";
import LoginService from "../../../services/LoginService";
import CartStore from "../../../stores/CartStore";

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
      totalProduct: CartStore.getTotalProduct(),
      route: window.location.pathname
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  }

  logout(e) {
    e.preventDefault();
    LoginService.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Ecommerce</Link>
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
          <li><Link to="/cart">Giỏ hàng <span className="badge">{this.state.totalProduct}</span></Link></li>
          <li><a>Welcome {this.state.userLoggedIn.name}</a></li>
          <li>
            <a className="btn btn-default" onClick={this.logout}>Logout</a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/cart">Giỏ hàng <span className="badge">{this.state.totalProduct}</span></Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      )
    }
  }

}
