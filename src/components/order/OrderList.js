import React, { Component } from "react";
import AuthenticatedUser from "../common/AuthenticatedUser";
import OrderStore from "../../stores/OrderStore";
import OrderService from "../../services/OrderService";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";
import { browserHistory } from "react-router";
import { FormattedNumber } from "react-intl";

export default AuthenticatedUser(
  class OrderList extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
      this.onCellClick = this.onCellClick.bind(this);
    }

    _getState() {
      return {
        orders: OrderStore.orders
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      OrderStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
      OrderService.fetchByUser(this.props.userLoggedIn.id);
    }

    componentWillUnmount() {
      OrderStore.removeChangeListener(this._onChange);
    }

    onCellClick(index) {
      browserHistory.push("/orders/" + this.state.orders[index].id);
    }

    render() {
      const orders = this.state.orders;

      return (
        <div className="order-list">
          <h3>Đơn hàng của tôi</h3>
          <Table onCellClick={this.onCellClick.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Mã đơn hàng</TableHeaderColumn>
                <TableHeaderColumn>Ngày đặt hàng</TableHeaderColumn>
                <TableHeaderColumn>Tổng số tiền</TableHeaderColumn>
                <TableHeaderColumn>Trạng thái</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {orders &&
                orders.map((order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>{order.id}</TableRowColumn>
                      <TableRowColumn>{order.created_date}</TableRowColumn>
                      <TableRowColumn>
                        <FormattedNumber value={order.total_cost} />
                      </TableRowColumn>
                      <TableRowColumn>{order.status}</TableRowColumn>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
          {!orders && <h3>Không có đơn đặt hàng nào</h3>}
        </div>
      );
    }
  }
);
