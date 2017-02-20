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
  if (Validator.isEmpty(data.email)) {
    errors.email = "Please insert email"
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please insert password"
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Please insert password confirm"
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirm must match with password"
  }
  return({
    errors: errors,
    isValid: isEmpty(errors)
  })
}
