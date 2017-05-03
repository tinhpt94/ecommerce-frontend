import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateComment(data) {
  let errors = {};
  if (Validator.isEmpty(data.title)) {
    errors.title = "Vui lòng nhập tiêu đề đánh giá"
  }
  if (Validator.isEmpty(data.content)) {
    errors.content = "Vui lòng nhập nội dung đánh giá"
  }

  return ({
    errors: errors,
    isValid: isEmpty(errors)
  })
}