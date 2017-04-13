import React, {Component} from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import DatePicker from "material-ui/DatePicker";
import ReportStore from "../../../stores/ReportStore";
import ReportService from "../../../services/ReportService";
import RaisedButton from "material-ui/RaisedButton";
import {LineChart, Line, Tooltip, Legend, XAxis, YAxis} from "recharts";

export default AuthenticatedAdmin(class Report extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.viewReport = this.viewReport.bind(this);
  }

  _getState() {
    return ({
      fromDate: ReportStore.fromDate,
      toDate: ReportStore.toDate,
      reports: ReportStore.reports
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ReportStore.addChangeListener(this._onChange)
  }

  componentDidMount() {
    ReportService.fetchReport(this.state.fromDate, this.state.toDate);
  }

  componentWillUnmount() {
    ReportStore.removeChangeListener(this._onChange)
  }

  disableFuture(date) {
    return date >= new Date();
  }

  handleChangeFromDate = (event, date) => {
    this.setState({
      fromDate: date,
    });
  };

  handleChangeToDate = (event, date) => {
    this.setState({
      toDate: date,
    });
  };

  viewReport() {
    ReportService.fetchReport(this.state.fromDate, this.state.toDate);
  }

  render() {
    return (
      <div className="report-wrapper">
        <div className="row">
          <div className="col-md-4">
            <DatePicker
              hintText="From date"
              value={this.state.fromDate}
              shouldDisableDate={this.disableFuture}
              autoOk={true}
              onChange={this.handleChangeFromDate}
            />
          </div>
          <div className="col-md-4">
            <DatePicker
              hintText="To date"
              value={this.state.toDate}
              shouldDisableDate={this.disableFuture}
              autoOk={true}
              onChange={this.handleChangeToDate}
            />
          </div>

          <div className="col-md-4">
            <RaisedButton label="Xem báo cáo" primary={true} onTouchTap={this.viewReport}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <LineChart data={this.state.reports} width={600} height={300}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="report_date"/>
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="order_amount" stroke="#8884d8" yAxisId="left"/>
              <Line type="monotone" dataKey="total_cost" stroke="#82ca9d" yAxisId="right"/>
            </LineChart>
          </div>
        </div>

      </div>
    )
  }
})