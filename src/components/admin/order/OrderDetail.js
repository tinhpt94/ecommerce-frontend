import React, { Component } from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import OrderService from "../../../services/OrderService";
import OrderStore from "../../../stores/OrderStore";
import OrderAction from "../../../actions/OrderAction";
import OrderItemTable from "../../order/OrderItemTable";
import { FormattedNumber } from "react-intl";
import RaisedButton from "material-ui/RaisedButton";
import CustomizedDialog from "../../common/CustomizedDialog";

const style = {
  margin: 12
};

export default AuthenticatedAdmin(
  class OrderDetail extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    _getState() {
      return {
        order: OrderStore.order,
        orderId: this.props.params.orderId,
        updateSuccess: OrderStore.updateOrderSuccess
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      OrderStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
      OrderService.fetchById(this.state.orderId);
    }

    componentWillUnmount() {
      OrderStore.removeChangeListener(this._onChange);
    }

    onButtonClick(e, status) {
      e.preventDefault();
      OrderService.updateOrder({
        id: this.state.orderId,
        status: status
      });
    }

    handleCloseDialog() {
      OrderAction.updateOrderError();
    }

    getVNStatus = engStatus => {
      let vnStatus = "";
      switch (engStatus) {
        case "PENDING":
          vnStatus = "Đang chờ xác nhận";
          break;
        case "SHIPPING":
          vnStatus = "Đang giao hàng";
          break;
        case "DELIVERED":
          vnStatus = "Giao hàng thành công";
          break;
        default:
          break;
      }
      return vnStatus;
    };

    render() {
      const order = this.state.order;
      const lineItems = order ? order.line_items : undefined;
      const actions = [
        <RaisedButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleCloseDialog}
        />
      ];

      return (
        <div className="tracking-order">
          {order
            ? <div className="tracking-order-info">
                <div className="tracking-order-info-header">
                  <div className="tracking-order-title text-center">
                    {"Mã đơn hàng: " + order.id}
                  </div>
                  <div className="tracking-order-title text-center">
                    {"Trạng thái đơn hàng: " + this.getVNStatus(order.status)}
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
                    <OrderItemTable items={lineItems} />
                    <div className="tracking-order-total">
                      <div className="title">{"Tổng thanh toán: "}</div>
                      <div className="price">
                        <FormattedNumber
                          value={order.total_cost}
                          style="currency"
                          currency="VND"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    {order &&
                      order.status === "PENDING" &&
                      <div className="text-right">
                        <RaisedButton
                          label="Huỷ"
                          style={style}
                          onTouchTap={e => this.onButtonClick(e, "CANCELLED")}
                        />
                        <RaisedButton
                          label="Giao hàng"
                          primary={true}
                          onTouchTap={e => this.onButtonClick(e, "SHIPPING")}
                        />
                      </div>}

                    {order &&
                      order.status === "SHIPPING" &&
                      <div className="text-right">
                        <RaisedButton
                          label="Huỷ"
                          style={style}
                          onTouchTap={e => this.onButtonClick(e, "CANCELLED")}
                        />
                        <RaisedButton
                          label="Đã giao"
                          primary={true}
                          onTouchTap={e => this.onButtonClick(e, "DELIVERED")}
                        />
                      </div>}
                  </div>
                </div>

                <CustomizedDialog
                  title="Thông báo"
                  content="Cập nhật trạng thái đơn hàng thành công"
                  open={this.state.updateSuccess}
                  handleClose={this.handleCloseDialog}
                  actions={actions}
                />
              </div>
            : <div>
                {"Đơn hàng với mã " + this.state.orderId + " Không tồn tại"}
              </div>}
        </div>
      );
    }
  }
);
