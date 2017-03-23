import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateConfirmInfor(data) {
  let errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = "Please insert name"
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Please insert phone"
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Please insert address"
  }
  return ({
    errors: errors,
    isValid: isEmpty(errors)
  })
}
