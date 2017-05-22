import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";

export default function validateSignUp(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = "Bạn chưa nhập tên tài khoản";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Bạn chưa nhập email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Bạn chưa nhập mật khẩu";
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Bạn chưa nhập mật khẩu xác nhận";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email không đúng định dạng";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Mật khẩu xác nhận phải giống mật khẩu";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Bạn chưa nhập họ và tên";
  }
  if (_.isEmpty(data.phone)) {
    errors.phone = "Bạn chưa nhập số điện thoại";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}
