/**
 * Created by PhamTinh on 2/18/2017.
 */

import React, {Component} from 'react';
import SignUpForm from '../../components/signup/SignUpForm';
import {connect} from 'react-redux';
import {userSignUpRequest} from '../../actions/signup/SignUpAction'

class SignUpPage extends Component {
  render() {
    const {userSignUpRequest} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <SignUpForm userSignUpRequest={userSignUpRequest}/>
          </div>
        </div>
      </div>
    )
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired
};

export default connect((state) => {return {} }, {userSignUpRequest})(SignUpPage)