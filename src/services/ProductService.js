import ProductAction from "../actions/ProductAction";
import ProductConstant from "../constants/ProductConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class ProductService {

  fetchAll() {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchAll(response.data);
          break;

        default:
          break
      }
    }).catch(function (error) {
      console.log(error);
    });
    // fake data
    // const size = 50;
    // let products = [];
    // for (let i = 0; i < size; i++) {
    //   products.push({
    //       id: i + 1,
    //       name: faker.commerce.productName(),
    //       imageUrl: faker.image.imageUrl(),
    //       price: faker.commerce.price()
    //     }
    //   )
    // }
    // ProductAction.fetchAll(products);
  }

  fetchByCode(code) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + code,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchByCode(response.data);
          break;

        default:
          break;
      }
    }).catch(function (error) {
      console.log(error);
    })
  }
}

export default new ProductService();