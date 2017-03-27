import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

export default function validateAddNewProduct(data) {
  let errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = "Please insert product name"
  }
  if (!isNumber(data.price)) {
    errors.price = "Please insert price"
  }
  if (!isNumber(data.discount)) {
    errors.discount = "Please insert discount"
  }
  if (!isNumber(data.quantity)) {
    errors.quantity = "Please insert quantity"
  }
  if (!isNumber(data.rating)) {
    errors.rating = "Please insert rating"
  }
  if (data.price <= 0) {
    errors.price = "Invalid price"
  }
  if (data.discount < 0) {
    errors.discount = "Invalid discount"
  }
  if (data.quantity <= 0) {
    errors.quantity = "Invalid quantity"
  }
  if (data.rating < 0) {
    errors.rating = "Invalid rating"
  }
  if (!isNumber(data.brand) || data.brand === 0) {
    errors.brand = "Please select brand"
  }
  if (!isNumber(data.made_in) || data.made_in === 0) {
    errors.made_in = "Please select made in"
  }
  if (!isNumber(data.product_type) || data.product_type === 0) {
    errors.product_type = "Please select product type"
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Please insert description"
  }
  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = "Please select image"
  }
  return ({
    errors: errors,
    isValid: isEmpty(errors)
  })
}
