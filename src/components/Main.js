import React from "react";
import NavigationBar from "./shared/navigation/NavigationBar";
import Footer from "./shared/footer/Footer";
import Header from "./shared/header/Header";

export default class Main extends React.Component {

  render() {
    return (
      <div id="main">
        <div id="header">
          <div className="container">
            <NavigationBar />
            <Header/>
          </div>
        </div>
        <div className="container" id="contents">
          {this.props.children}
        </div>

        <div className="container" id="footer">
          <Footer/>
        </div>
      </div>
    )
  }

}
