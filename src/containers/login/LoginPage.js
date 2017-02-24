/**
 * Created by PhamTinh on 2/19/2017.
 */
import React, {Component} from 'react'
import LoginForm from '../../components/auth/LoginForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

class LoginPage extends Component {
  render() {
    const {loginRequest} = this.props.actions;
    return(
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <LoginForm login={loginRequest}/>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.auth, dispatch),
    dispatch
  };
}

export default connect(mapDispatchToProps)(LoginPage)
