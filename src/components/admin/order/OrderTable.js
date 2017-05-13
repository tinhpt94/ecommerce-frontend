import React, { Component } from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";
import { FormattedNumber } from "react-intl";
import { browserHistory } from "react-router";

export default AuthenticatedAdmin(
  class OrderTable extends Component {
    onCellClick(index) {
      browserHistory.push("/admin/orders/" + this.props.orders[index].id);
    }

    render() {
      const { orders } = this.props;
      return (
        <Table onCellClick={this.onCellClick.bind(this)}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Order ID</TableHeaderColumn>
              <TableHeaderColumn>Oder Date</TableHeaderColumn>
              <TableHeaderColumn>Buyer</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {orders &&
              orders.map((order, index) => {
                return (
                  <TableRow key={index}>
                    <TableRowColumn>{order.id}</TableRowColumn>
                    <TableRowColumn>{order.created_date}</TableRowColumn>
                    <TableRowColumn>{order.customer_name}</TableRowColumn>
                    <TableRowColumn>
                      <FormattedNumber value={order.total_cost} />
                    </TableRowColumn>
                    <TableRowColumn>{order.status}</TableRowColumn>
                  </TableRow>
                );
              })}
            {!orders && <TableRow>Không có đơn đặt hàng nào</TableRow>}
          </TableBody>
        </Table>
      );
    }
  }
);
