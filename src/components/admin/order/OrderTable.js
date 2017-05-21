import React, { Component } from "react";
import AuthenticatedManager from "../../common/AuthenticatedManager";
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

export default AuthenticatedManager(
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
              <TableHeaderColumn style={{width: "10%"}}>Mã đơn hàng</TableHeaderColumn>
              <TableHeaderColumn style={{width: "25%"}}>Ngày đặt hàng</TableHeaderColumn>
              <TableHeaderColumn style={{width: "35%"}}>Tên khách hàng</TableHeaderColumn>
              <TableHeaderColumn style={{width: "15%"}}>Giá trị đơn hàng</TableHeaderColumn>
              <TableHeaderColumn style={{width: "15%"}}>Trạng thái</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {orders &&
              orders.map((order, index) => {
                return (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: "10%"}}>{order.id}</TableRowColumn>
                    <TableRowColumn style={{width: "25%"}}>{order.created_date}</TableRowColumn>
                    <TableRowColumn style={{width: "35%"}}>{order.customer_name}</TableRowColumn>
                    <TableRowColumn style={{width: "15%"}}>
                      <FormattedNumber value={order.total_cost} 
                      style="currency"
                      currency="VND"/>
                    </TableRowColumn>
                    <TableRowColumn style={{width: "15%"}}>{order.status}</TableRowColumn>
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
