import React, {Component} from "react";
import AuthenticatedUser from "../common/AuthenticatedUser";
import {List, ListItem} from "material-ui/List";
import Receipt from "material-ui/svg-icons/action/receipt";
import Settings from "material-ui/svg-icons/action/settings";
import {Link} from "react-router";

export default AuthenticatedUser(class UserLayout extends Component {

  render() {
    return (
      <div className="user-layout">
        <div className="row">
          <div className="col-md-3">
            <div className="user-side-menu">
              <div>
                <List>
                  <ListItem
                    primaryText={<Link to="/user/orders">Đơn hàng của tôi</Link>}
                    leftAvatar={<Receipt/>} className={window.location === "/user/orders" ? "selected-link" : ""}/>

                  <ListItem
                    primaryText={<Link to="/user/profile" activeClassName="selected-link">Thông tin cá nhân</Link>}
                    leftAvatar={<Settings />}>

                  </ListItem>
                </List>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="user-page-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
})