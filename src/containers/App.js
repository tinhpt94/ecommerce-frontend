/**
 * Created by PhamTinh on 2/18/2017.
 */
import React from 'react'
import NavigationBar from '../components/shared/navigation/NavigationBar'
import Footer from '../components/shared/footer/Footer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
        <div className="container">
          <NavigationBar />
          {this.props.children}
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
