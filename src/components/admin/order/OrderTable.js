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
import OrderConstant from "../../../constants/OrderConstant";
import { Pagination } from "react-bootstrap";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default AuthenticatedManager(
  class OrderTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 1,
        itemParPage: 12
      };
    }
    onCellClick = (index) => {
      browserHistory.push("/admin/orders/" + this.props.orders[(this.state.activePage - 1) * this.state.itemParPage + index].id);
    }

    handleSelectPage = eventKey => {
      this.setState({
        activePage: eventKey
      });
    };

    handleChangeItem = (event, index, value) =>
      this.setState({
        itemParPage: value
      });

    render() {
      const { orders } = this.props;
      const { activePage, itemParPage } = this.state;
      const items = orders && orders.length > 0
        ? Math.ceil(orders.length / itemParPage)
        : 0;
      return (
        <div className="order-table">
          <Table fixedHeader onCellClick={this.onCellClick}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: "10%" }}>
                  Mã đơn hàng
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "25%" }}>
                  Ngày đặt hàng
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "30%" }}>
                  Tên khách hàng
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "15%" }}>
                  Giá trị đơn hàng
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "20%" }}>
                  Trạng thái
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {orders &&
                orders
                  .slice(
                    (activePage - 1) * itemParPage,
                    activePage * itemParPage
                  )
                  .map((order, index) => {
                    return (
                      <TableRow key={index}>
                        <TableRowColumn style={{ width: "10%" }}>
                          {order.id}
                        </TableRowColumn>
                        <TableRowColumn style={{ width: "25%" }}>
                          {order.created_date}
                        </TableRowColumn>
                        <TableRowColumn style={{ width: "30%" }}>
                          {order.customer_name}
                        </TableRowColumn>
                        <TableRowColumn style={{ width: "15%" }}>
                          <FormattedNumber
                            value={order.total_cost}
                            style="currency"
                            currency="VND"
                          />
                        </TableRowColumn>
                        <TableRowColumn style={{ width: "20%" }}>
                          {OrderConstant[order.status]}
                        </TableRowColumn>
                      </TableRow>
                    );
                  })}
              {!orders && <TableRow>Không có đơn đặt hàng nào</TableRow>}
            </TableBody>
          </Table>
          <div className="order-table-footer">
            <div className="row">
              <div className="col-md-3">
                <DropDownMenu
                  value={this.state.itemParPage}
                  onChange={this.handleChangeItem}
                >
                  <MenuItem value={12} primaryText="12 đơn hàng mỗi trang" />
                  <MenuItem value={24} primaryText="24 đơn hàng mỗi trang" />
                  <MenuItem value={48} primaryText="48 đơn hàng mỗi trang" />

                </DropDownMenu>
              </div>
              <div className="col-md-9 text-right">
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={items}
                  maxButtons={5}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelectPage}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
