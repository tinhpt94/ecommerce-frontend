import React, { Component } from "react";
import AuthenticatedManager from "../common/AuthenticatedManager";
import SideBar from "./SideBar";
import { Link } from "react-router";
import {
  MuiThemeProvider,
  IconMenu,
  IconButton,
  ToolbarGroup,
  MenuItem
} from "material-ui";
import NavigationExpandMoreIcon
  from "material-ui/svg-icons/navigation/expand-more";
import LoginService from "../../services/LoginService";
import { IntlProvider } from "react-intl";

export default AuthenticatedManager(
  class AdminLayout extends Component {
    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }

    logout() {
      LoginService.logout();
    }

    render() {
      return (
        <IntlProvider locale="en">
          <MuiThemeProvider>
            <div id="main">
              <div className="header">
                <nav className="navbar navbar-default">
                  <div className="container">
                    <div className="navbar-header">
                      <Link className="navbar-brand" to="/admin">
                        Dashboard
                      </Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                      <li><a>Xin chào {this.props.userLoggedIn.name}</a></li>
                      <li>
                        <ToolbarGroup>
                          <IconMenu
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left"
                            }}
                            iconButtonElement={
                              <IconButton touch={true}>
                                <NavigationExpandMoreIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem
                              primaryText="Log out"
                              onTouchTap={this.logout}
                            />
                          </IconMenu>
                        </ToolbarGroup>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div>
                <div className="row no-margin-right">
                  <div className="col-md-2">
                    <SideBar />
                  </div>
                  <div className="col-md-10">
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </MuiThemeProvider>
        </IntlProvider>
      );
    }
  }
);
