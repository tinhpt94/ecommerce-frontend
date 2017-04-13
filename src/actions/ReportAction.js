import ReportConstant from "../constants/ReportConstant";
import Dispatcher from "../dispatcher/Dispatcher";

export default {
  fetchReport: (reports, fromDate, toDate) => {
    Dispatcher.dispatch({
      actionType: ReportConstant.FETCH_REPORT,
      reports,
      fromDate,
      toDate
    })
  }
}