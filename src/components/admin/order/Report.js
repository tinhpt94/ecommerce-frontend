import React, { Component } from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import DatePicker from "material-ui/DatePicker";
import ReportStore from "../../../stores/ReportStore";
import ReportService from "../../../services/ReportService";
import RaisedButton from "material-ui/RaisedButton";
import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ComposedChart,
  Bar
} from "recharts";
import { CustomizedAxisTick } from "./Graph";
import moment from "moment";

export default AuthenticatedAdmin(
  class Report extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
      this._onChange = this._onChange.bind(this);
      this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
      this.handleChangeToDate = this.handleChangeToDate.bind(this);
      this.viewReport = this.viewReport.bind(this);
    }

    _getState() {
      return {
        fromDate: ReportStore.fromDate,
        toDate: ReportStore.toDate,
        reports: ReportStore.reports
      };
    }

    _onChange() {
      this.setState(this._getState());
    }

    componentWillMount() {
      ReportStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
      ReportService.fetchReport(this.state.fromDate, this.state.toDate);
    }

    componentWillUnmount() {
      ReportStore.removeChangeListener(this._onChange);
    }

    disableFuture(date) {
      return date >= new Date();
    }

    handleChangeFromDate = (event, date) => {
      this.setState({
        fromDate: date,
        toDate: this.getToDate(date)
      });
    };

    handleChangeToDate = (event, date) => {
      this.setState({
        toDate: date
      });
    };

    viewReport() {
      ReportService.fetchReport(this.state.fromDate, this.state.toDate);
    }

    getToDate = fromDate => {
      const toDate = moment(fromDate).add(31, "days").toDate();
      return new Date() > toDate ? toDate : new Date();
    };

    getMaxDate = () => {
      return moment(this.state.fromDate).add(31, "days").toDate();
    };

    render() {
      return (
        <div className="report-wrapper">
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
                maxDate={this.state.toDate}
                onChange={this.handleChangeFromDate}
                className="date-picker"
                style={{width: 100}}
              />
            </div>
            <div className="col-md-4">
              <div className="date-picker-label">Đến ngày</div>
              <DatePicker
                hintText="Đến ngày"
                value={this.state.toDate}
                shouldDisableDate={this.disableFuture}
                minDate={this.state.fromDate}
                maxDate={this.getMaxDate()}
                autoOk={true}
                onChange={this.handleChangeToDate}
                className="date-picker"
              />
            </div>

            <div className="col-md-4">
              <RaisedButton
                label="Xem báo cáo"
                primary={true}
                onTouchTap={this.viewReport}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <ComposedChart
                data={this.state.reports}
                width={800}
                height={400}
                margin={{top: 40}}
              >
                <XAxis
                  tick={<CustomizedAxisTick reports={this.state.reports} />}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8" label="Đơn hàng" width={100}/>
                <YAxis yAxisId="left" orientation="left" stroke="#3C78D8" label="Giá trị"/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="order_amount"
                  stroke="#8884d8"
                  yAxisId="right"
                />
                <Bar dataKey="total_cost" barSize={10} fill="#3C78D8" yAxisId="left" />
              </ComposedChart>
            </div>
          </div>

        </div>
      );
    }
  }
);
