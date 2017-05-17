import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";
import { FormattedNumber } from "react-intl";

export default class OrderItemTable extends Component {
  render() {
    const { items } = this.props;

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{width: "5%"}}>#</TableHeaderColumn>
            <TableHeaderColumn style={{width: "40%"}}>Sản phẩm</TableHeaderColumn>
            <TableHeaderColumn style={{width: "15%"}}>Đơn giá</TableHeaderColumn>
            <TableHeaderColumn style={{width: "10%"}}>Giảm giá</TableHeaderColumn>
            <TableHeaderColumn style={{width: "10%"}}>Số lượng</TableHeaderColumn>
            <TableHeaderColumn style={{width: "20%"}}>Thành tiền</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {items &&
            items.map((item, index) => {
              return (
                <TableRow key={index} hoverable={true}>
                  <TableRowColumn style={{width: "5%"}}>{index + 1}</TableRowColumn>
                  <TableRowColumn style={{width: "40%"}}>{item.name}</TableRowColumn>
                  <TableRowColumn style={{width: "15%"}}>
                    <FormattedNumber
                      value={item.price}
                      style="currency"
                      currency="VND"
                    />
                  </TableRowColumn>
                  <TableRowColumn style={{width: "10%"}}>
                    {item.discount + "%"}
                  </TableRowColumn>
                  <TableRowColumn style={{width: "10%"}}>
                    <FormattedNumber value={item.amount} />
                  </TableRowColumn>
                  <TableRowColumn style={{width: "20%"}}>
                    <FormattedNumber
                      value={
                        item.amount * item.price * (100 - item.discount) / 100
                      }
                      style="currency"
                      currency="VND"
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }
}
