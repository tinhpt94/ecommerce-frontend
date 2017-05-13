import axios from "axios";
import OrderConstant from "../constants/OrderConstant";
import GlobalConstant from "../constants/GlobalConstant";
import OrderAction from "../actions/OrderAction";

class OrderService {
  fetchAll() {
    const url = GlobalConstant.BASE_API + OrderConstant.URL;
    axios({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        switch (response.status) {
          case 200:
            OrderAction.fetchAll(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 403:
              break;
            default:
              break;
          }
        } else {
          console.log("Error", error.message);
        }
      });
  }

  fetchById(id) {
    const url = GlobalConstant.BASE_API + OrderConstant.URL + "/" + id;
    axios({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        switch (response.status) {
          case 200:
            OrderAction.fetchById(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 403:
              break;
            default:
              break;
          }
        } else {
          console.log("Error", error.message);
        }
      });
  }

  updateOrder(order) {
    const url = GlobalConstant.BASE_API + OrderConstant.URL;
    axios({
      url: url,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        id: order.id,
        status: order.status
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        switch (response.status) {
          case 200:
            OrderAction.updateOrderSuccess(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 403:
              break;
            default:
              break;
          }
        } else {
          console.log("Error", error.message);
        }
      });
  }

  fetchByUser(userId) {
    const url = GlobalConstant.BASE_API + OrderConstant.URL_USER + userId;
    axios({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        switch (response.status) {
          case 200:
            OrderAction.fetchByUser(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 403:
              break;
            default:
              break;
          }
        } else {
          console.log("Error", error.message);
        }
      });
  }
}

export default new OrderService();
