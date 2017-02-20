/**
 * Created by PhamTinh on 2/19/2017.
 */
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateSignUp(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = "Please insert username"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please insert password"
  }

  return ({
    errors: errors,
    isValid: isEmpty(errors)
  })
}
