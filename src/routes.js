/**
 * Created by PhamTinh on 2/18/2017.
 */
import React from 'react'
import {Route} from 'react-router'
import SignUpPage from './components/auth/SignUpPage'
import App from './components/App'
import LoginPage from './components/auth/LoginPage'

export default (
  <Route path="/" component={App}>
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
)
