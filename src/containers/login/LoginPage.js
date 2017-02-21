/**
 * Created by PhamTinh on 2/19/2017.
 */
import React, {Component} from 'react'
import LoginForm from '../../components/auth/LoginForm'
import {connect} from 'react-redux'
import {loginRequest} from '../../actions/login/LoginAction'

class LoginPage extends Component {
  render() {
    const {loginRequest} = this.props;
    return(
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <LoginForm loginRequest={loginRequest}/>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  loginRequest: React.PropTypes.func.isRequired
};

export default connect((state) => {return {}}, {loginRequest})(LoginPage)
