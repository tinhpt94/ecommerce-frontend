import React, { Component } from "react";

import AuthenticatedUser from "../common/AuthenticatedUser";
import OrderStore from "../../stores/OrderStore";
import OrderService from "../../services/OrderService";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import OrderItemTable from "../order/OrderItemTable";
import { FormattedNumber } from "react-intl";

export default AuthenticatedUser(
  class OrderDetail extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
    }

    _getState() {
      return {
        orderId: this.props.params.orderId,
        order: OrderStore.getCurrentOrder()
      };
    }

    _onChange = () => {
      this.setState(this._getState());
    };

    componentWillMount = () => {
      OrderStore.addChangeListener(this._onChange);
    };

    componentDidMount = () => {
      OrderService.fetchById(this.state.orderId);
    };

    componentWillUnmount = () => {
      OrderStore.removeChangeListener(this._onChange);
    };

    getStepIndex = () => {
      let index = 0;
      switch (this.state.order.status) {
        case "PENDING":
          index = 1;
          break;
        case "SHIPPING":
          index = 2;
          break;
        case "DELIVERED":
          index = 4;
          break;
      }
      return index;
    };

    render() {
      const order = this.state.order;
      const stepIndex = order ? this.getStepIndex() : -1;
      return (
        <div className="tracking-order">
          {order
            ? <div className="tracking-order-info">
                <div className="tracking-order-info-header">
                  <div className="tracking-order-title text-center">
                    {"Mã đơn hàng: " + order.id}
                  </div>

                  <div className="tracking-order-step">
                    <div style={{ width: "100%", margin: "auto" }}>
                      <Stepper activeStep={stepIndex}>
                        <Step>
                          <StepLabel>Đặt hàng thành công</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Đang chờ xác nhận</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Đang giao hàng</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Đã giao hàng</StepLabel>
                        </Step>
                      </Stepper>
                    </div>
                  </div>
                </div>

                <div className="tracking-order-info-content">
                  <div className="tracking-order-info-content-address">
                    <h4>Địa chỉ giao hàng</h4>
                    <div>{order.customer_name}</div>
                    <div>{order.customer_phone}</div>
                    <div>{order.customer_email}</div>
                    <div>{order.customer_address}</div>
                  </div>

                  <div className="tracking-order-info-content-items">
                    <h4 className="text-center">Đơn hàng bao gồm</h4>
                    <OrderItemTable items={order.line_items} />
                    <div className="tracking-order-total">
                      <div className="title">{"Tổng thanh toán: "}</div>
                      <div className="price">
                        <FormattedNumber
                            value={order.total_cost}
                            style="currency"
                            currency="VND"
                          /></div>
                    </div>
                  </div>
                </div>
              </div>
            : <div className="tracking-order-info">
                <div className="tracking-order-title text-center">
                  Đơn hàng không tồn tại
                </div>
              </div>}
        </div>
      );
    }
  }
);
