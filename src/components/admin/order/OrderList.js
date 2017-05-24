import React, { Component } from "react";
import AuthenticatedManager from "../../common/AuthenticatedManager";
import { Tabs, Tab } from "material-ui/Tabs";
import OrderTable from "./OrderTable";
import OrderStore from "../../../stores/OrderStore";
import OrderService from "../../../services/OrderService";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import OrderConstant from "../../../constants/OrderConstant";
import IconButton from "material-ui/IconButton";
import ExportIcon from "material-ui/svg-icons/file/file-download";
import { CSVLink, CSVDownload } from "react-csv";

export default AuthenticatedManager(
  class OrderList extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
    }

    _getState() {
      return {
        orders: OrderStore.orders,
        fromDate: OrderStore.fromDate,
        toDate: OrderStore.toDate
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      OrderStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
      OrderService.fetchByDate(this.state.fromDate, this.state.toDate);
    }

    componentWillUnmount() {
      OrderStore.removeChangeListener(this._onChange);
    }

    getToDate = fromDate => {
      const toDate = moment(fromDate).add(31, "days").toDate();
      return new Date() > toDate ? toDate : new Date();
    };

    getMaxDate = () => {
      return moment(this.state.fromDate).add(31, "days").toDate();
    };

    formatDate = date => {
      return moment(date).format("DD-MM-YYYY");
    };

    viewOrder = () => {
      OrderService.fetchByDate(this.state.fromDate, this.state.toDate);
    };

    csvFileName = () => {
      return (
        "orders-" +
        moment(OrderStore.fromDate).format("DDMMYYYY") +
        "-" +
        moment(OrderStore.toDate).format("DDMMYYYY") +
        ".csv"
      );
    };

    handleChangeFromDate = (event, date) => {
      this.setState({
        fromDate: date
      });
    };

    handleChangeToDate = (event, date) => {
      this.setState({
        toDate: date
      });
    };

    disableFuture(date) {
      return date >= new Date();
    }

    render() {
      const orders = this.state.orders;
      return (
        <div className="order-wrapper">
          <div className="row">
            <div className="col-md-4">
              <div className="date-picker-label">
                Từ ngày
              </div>
              <DatePicker
                hintText="Từ ngày"
                value={this.state.fromDate}
                shouldDisableDate={this.disableFuture}
                autoOk={true}
                onChange={this.handleChangeFromDate}
                className="date-picker"
                formatDate={this.formatDate}
              />
            </div>
            <div className="col-md-4">
              <div className="date-picker-label">Đến ngày</div>
              <DatePicker
                hintText="Đến ngày"
                value={this.state.toDate}
                shouldDisableDate={this.disableFuture}
                minDate={this.state.fromDate}
                autoOk={true}
                onChange={this.handleChangeToDate}
                className="date-picker"
                formatDate={this.formatDate}
              />
            </div>

            <div className="col-md-4">
              <RaisedButton
                label="Xem báo cáo"
                primary={true}
                onTouchTap={this.viewOrder}
              />
              {orders &&
                <IconButton tooltip="Xuất file báo cáo">
                  <CSVLink
                    data={orders}
                    filename={this.csvFileName()}
                    target="_blank"
                  >
                    <ExportIcon />
                  </CSVLink>
                </IconButton>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {orders && orders.length > 0 ? <OrderTable orders={orders} /> : <div className="text-center">Không có đơn hàng thoả mãn</div>}
            </div>
          </div>
        </div>
      );
    }
  }
);
