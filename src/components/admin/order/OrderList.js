import React, {Component} from "react";
import AuthenticatedAdmin from "../../common/AuthenticatedAdmin";
import {Tabs, Tab} from "material-ui/Tabs";
import OrderTable from "./OrderTable";
import OrderStore from "../../../stores/OrderStore";
import OrderService from "../../../services/OrderService";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default AuthenticatedAdmin(class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
  }

  _getState() {
    return ({
      orders: OrderStore.orders
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    OrderStore.addChangeListener(this._onChange)
  }

  componentDidMount() {
    OrderService.fetchAll()
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this._onChange)
  }

  render() {
    const orders = this.state.orders;
    return (
      <Tabs>
        <Tab label="Chờ xác nhận">
          <OrderTable orders={orders ? orders.filter(order => order.status === "PENDING") : undefined}/>
        </Tab>
        <Tab label="Đang giao">
          <OrderTable orders={orders ? orders.filter(order => order.status === "SHIPPING") : undefined}/>
        </Tab>
        <Tab label="Đã giao">
          <OrderTable orders={orders ? orders.filter(order => order.status === "DELIVERED") : undefined}/>
        </Tab>
        <Tab label="Đã huỷ">
          <OrderTable orders={orders ? orders.filter(order => order.status === "CANCELLED") : undefined}/>
        </Tab>
      </Tabs>
    )
  }
})