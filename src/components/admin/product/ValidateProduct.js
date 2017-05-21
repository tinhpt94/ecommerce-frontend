import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

export default function validateAddNewProduct(data) {
  let errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = "Please insert product name";
  }
  if (!isNumber(data.price)) {
    errors.price = "Please insert price";
  }
  if (!isNumber(data.discount)) {
    errors.discount = "Please insert discount";
  }
  if (!isNumber(data.quantity)) {
    errors.quantity = "Please insert quantity";
  }
  if (!isNumber(data.rating)) {
    errors.rating = "Please insert valid rating";
  }
  if (data.price < 0) {
    errors.price = "Please insert valid price";
  }
  if (data.discount < 0) {
    errors.discount = "Please insert valid discount";
  }
  if (data.quantity < 0) {
    errors.quantity = "Please insert valid quantity";
  }
  if (data.rating < 0) {
    errors.rating = "Please insert valid rating";
  }
  if (data.brand === '') {
    errors.brand = "Please select brand";
  }
  if (data.made_in === '') {
    errors.made_in = "Please select made in";
  }
  if (data.product_type === '') {
    errors.product_type = "Please select product type";
  }
  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = "Please select image";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}
