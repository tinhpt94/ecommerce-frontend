import ProductAction from "../actions/ProductAction";
import ProductConstant from "../constants/ProductConstant";
import GlobalConstant from "../constants/GlobalConstant";
import axios from "axios";

class ProductService {
  fetchAll() {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchAll(response.data);
          break;
        default:
          break;
      }
    });
  }

  fetchByCode(code) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + code,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        switch (response.status) {
          case 200:
            ProductAction.fetchByCode(response.data);
            break;
          default:
            break;
        }
      })
      .catch(function(error) {
        if (error.response && error.response.status === 404)
          ProductAction.fetchByCodeNotFound();
      });
  }

  fetchById(id) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + "id/" + id,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        switch (response.status) {
          case 200:
            ProductAction.fetchByCode(response.data);
            break;
          default:
            break;
        }
      })
      .catch(function(error) {
        if (error.response && error.response.status === 404)
          ProductAction.fetchByCodeNotFound();
      });
  }

  fetchByBrand(code) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + "brand/" + code,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchByBrand(response.data);
          break;
        default:
          break;
      }
    });
  }

  fetchByType(code) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + "product-type/" + code,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchByType(response.data);
          break;
        default:
          break;
      }
    });
  }

  fetchByMadeIn(code) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + "made-in/" + code,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      switch (response.status) {
        case 200:
          ProductAction.fetchByMadeIn(response.data);
          break;
        default:
          break;
      }
    });
  }

  addNew(product) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
        brand: parseInt(product.brand),
        made_in: parseInt(product.made_in),
        product_type: parseInt(product.product_type),
        discount: product.discount,
        quantity: product.quantity,
        rating: product.rating
      }
    })
      .then(response => {
        switch (response.status) {
          case 201:
            ProductAction.addNewSuccess();
            break;
          default:
            break;
        }
      })
      .catch(error => {
        ProductAction.addNewError();
      });
  }

  edit(product) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
        brand: parseInt(product.brand),
        made_in: parseInt(product.made_in),
        product_type: parseInt(product.product_type),
        discount: product.discount,
        quantity: product.quantity,
        rating: product.rating
      }
    })
      .then(response => {
        switch (response.status) {
          case 200:
            ProductAction.editSuccess();
            break;
          default:
            break;
        }
      })
      .catch(error => {
        ProductAction.editError();
      });
  }

  delete(product) {
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
        brand: product.brand.id,
        made_in: product.made_in.id,
        product_type: product.product_type.id,
        discount: product.discount,
        quantity: product.quantity,
        rating: product.rating
      }
    })
      .then(response => {
        switch (response.status) {
          case 200:
            ProductAction.delete(product);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  addComment(comment) {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    axios({
      baseURL: GlobalConstant.BASE_API,
      url: ProductConstant.URL + "comments/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        title: comment.title,
        content: comment.content,
        rating: comment.rating,
        product_id: comment.productId,
        user_id: userId
      }
    })
      .then(response => {
        switch (response.status) {
          case 201:
            ProductAction.addComment(response.data);
            break;
          default:
            break;
        }
      })
      .catch(error => {
        if (error.response) {
        } else {
          console.log(error);
        }
      });
  }
}

export default new ProductService();
