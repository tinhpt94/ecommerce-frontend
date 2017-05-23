import CartAction from "../actions/CartAction";
import CartConstant from "../constants/CartConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class CartService {
  order(customer, total, note, lineItems) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: CartConstant.URL,
      method: "POST",
      type: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        customer: customer,
        total: total,
        note: note,
        line_items: lineItems,
        user_id: JSON.parse(localStorage.getItem("user")).id
      },
      crossDomain: true,
      withCredentials: true
    })
      .then(response => {
        switch (response.status) {
          case 201:
            CartAction.orderSuccess(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default new CartService();
