import React, { Component } from "react";
import AuthenticatedUser from "../common/AuthenticatedUser";

export default AuthenticatedUser(
  class Order extends Component {
    render() {
      const { order } = this.props;
      render(
        <div className="order-group">
          <div className="order-content">
            <div className="order-image">
              <img src={order.line_items[0].image_url} />
            </div>
            <div className="order-content-detail">
              <div className="order-content-description" />
            </div>
          </div>
        </div>
      );
    }
  }
);
