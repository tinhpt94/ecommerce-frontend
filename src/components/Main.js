import React from "react";
import NavigationBar from "./shared/navigation/NavigationBar";
import Footer from "./shared/footer/Footer";
import Header from "./shared/header/Header";
import { IntlProvider } from "react-intl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ScrollToTop from "../components/common/ScrollToTop";

export default class Main extends React.Component {
  render() {
    return (
      <IntlProvider locale="en">
        <MuiThemeProvider>
          <div id="main">
            <div id="header">
              <NavigationBar />
            </div>
            <div className="container" id="menu-item">
              <Header />
            </div>
            <div className="container" id="contents">
              <div className="contents">
                {this.props.children}
              </div>
            </div>

            <div className="container" id="footer">
              <Footer />
            </div>
            
            <ScrollToTop delayInMs={500}/>

          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}
