import BaseStore from "./BaseStore";
import ReportConstant from "../constants/ReportConstant";
import moment from "moment";

class ReportStore extends BaseStore {
  constructor() {
    super();
    this.reports = [];
    this.fromDate = moment().startOf("month").toDate();
    this.toDate = moment().toDate();
    this.subscribe(() => this.handler.bind(this));
  }

  handler(action) {
    switch (action.actionType) {
      case ReportConstant.FETCH_REPORT:
        this.reports = action.reports;
        this.fromDate = action.fromDate;
        this.toDate = action.toDate;
        this.emitChange();
        break;
      default:
        break;
    }
  }
}

export default new ReportStore()
