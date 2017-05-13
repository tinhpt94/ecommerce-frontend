import axios from "axios";
import moment from "moment";
import GlobalConstant from "../constants/GlobalConstant";
import ReportConstant from "../constants/ReportConstant";
import ReportAction from "../actions/ReportAction";

class ReportService {
  fetchReport(fromDate, toDate) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ReportConstant.URL +
        "?from=" +
        moment(fromDate).format("DD-MM-YYYY") +
        "&to=" +
        moment(toDate).format("DD-MM-YYYY"),
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        ReportAction.fetchReport(response.data, fromDate, toDate);
      })
      .catch(error => {});
  }
}

export default new ReportService();
