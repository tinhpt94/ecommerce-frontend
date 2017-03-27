import React, {Component} from "react";
import SideBar from "./SideBar";

export default class AdminLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <SideBar/>
        {this.props.children}
      </div>
    )
  }
}
