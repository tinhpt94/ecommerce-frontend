import React from "react";

export default class Tr extends React.Component {
  render() {
    const { title, value } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{value}</td>
      </tr>
    );
  }
}
