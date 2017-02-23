/**
 * Created by PhamTinh on 2/19/2017.
 */
import React, {Component} from 'react'
import LoginForm from '../../components/auth/LoginForm'
import {connect} from 'react-redux'
import {login} from '../../api/AuthAPI'

class LoginPage extends Component {
  render() {
    const {login} = this.props;
    return(
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <LoginForm login={login}/>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired
};

export default connect((state) => {return {}}, {login})(LoginPage)
