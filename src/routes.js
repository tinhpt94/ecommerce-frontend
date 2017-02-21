/**
 * Created by PhamTinh on 2/18/2017.
 */
import React from 'react'
import {Route} from 'react-router'
import SignUpPage from './containers/signup/SignUpPage'
import App from './containers/App'
import LoginPage from './containers/login/LoginPage'

export default (
  <Route path="/" component={App}>
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
)
