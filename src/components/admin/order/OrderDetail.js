import React, { Component } from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import OrderService from "../../../services/OrderService";
import OrderStore from "../../../stores/OrderStore";
import OrderAction from "../../../actions/OrderAction";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";
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
        orderDetail: OrderStore.order,
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
        id: this.state.orderDetail.id,
        status: status
      });
    }

    handleCloseDialog() {
      OrderAction.updateOrderError();
    }

    render() {
      const orderDetail = this.state.orderDetail;
      const lineItems = orderDetail ? orderDetail.line_items : undefined;
      const actions = [
        <RaisedButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleCloseDialog}
        />
      ];

      return (
        <div>
          <h3>Mã hoá đơn: {orderDetail && orderDetail.id}</h3>
          <h3>Trạng thái: {orderDetail && orderDetail.status}</h3>
          <h3>Sản phẩm trong đơn hàng</h3>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderColumn>Sản phẩm</TableHeaderColumn>
                <TableHeaderColumn>Đơn giá</TableHeaderColumn>
                <TableHeaderColumn>Số lượng</TableHeaderColumn>
                <TableHeaderColumn>Thành tiền</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {lineItems &&
                lineItems.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>{item.name}</TableRowColumn>
                      <TableRowColumn>
                        <FormattedNumber value={item.price} />
                      </TableRowColumn>
                      <TableRowColumn>
                        <FormattedNumber value={item.quantity} />
                      </TableRowColumn>
                      <TableRowColumn>
                        <FormattedNumber value={item.quantity * item.price} />
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              {!lineItems && <TableRow>Không có sản phẩm nào</TableRow>}
            </TableBody>
          </Table>
          <div className="row">
            <div className="col-md-12">
              {orderDetail &&
                orderDetail.status === "PENDING" &&
                <div className="text-right">
                  <RaisedButton
                    label="CANCEL"
                    style={style}
                    onTouchTap={e => this.onButtonClick(e, "CANCELLED")}
                  />
                  <RaisedButton
                    label="SHIPPING"
                    primary={true}
                    onTouchTap={e => this.onButtonClick(e, "SHIPPING")}
                  />
                </div>}

              {orderDetail &&
                orderDetail.status === "SHIPPING" &&
                <div className="text-right">
                  <RaisedButton
                    label="CANCEL"
                    style={style}
                    onTouchTap={e => this.onButtonClick(e, "CANCELLED")}
                  />
                  <RaisedButton
                    label="DELIVERED"
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
      );
    }
  }
);
