import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateSignUp(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = "Vui lòng nhập tên tài khoản";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}
