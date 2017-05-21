import React, { Component } from "react";
import ProductService from "../../services/ProductService";
import ProductStore from "../../stores/ProductStore";
import GuestOrUser from "../common/GuestOrUser";
import { Link } from "react-router";
import { isNew } from "../../utils/date";
import Slider from "react-slick";
import ProductItem from "../product/ProductItem";

export default GuestOrUser(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = this._getState();
    }

    _getState = () => {
      return {
        products: ProductStore.fetchAll()
      };
    };

    _onChange = () => {
      this.setState(this._getState);
    };

    componentWillMount = () => {
      ProductStore.addChangeListener(this._onChange);
    };

    componentDidMount = () => {
      ProductService.fetchAll();
    };

    componentWillUnmount = () => {
      ProductStore.removeChangeListener(this._onChange);
    };

    render() {
      const productTypes = [
        ...new Set(this.state.products.map(product => product.product_type))
      ];
      console.log(productTypes);
      console.log(new Set(this.state.products.map(product => product.product_type)));
      const newProducts = this.state.products.filter(product =>
        isNew(product.created_date)
      );
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        pauseOnHover: true
      };

      return (
        <div className="product-recommend-items">
          {newProducts.length > 0 &&
            <div className="header-section header-section-simple">
              <div className="header-section-header">
                <div className="header-section-header-title">
                  SẢN PHẨM MỚI
                </div>
                <Link className="header-section-header-link" to="/news">
                  Xem tất cả
                </Link>
              </div>
              <div className="header-section-content">
                <Slider {...settings}>
                  {newProducts.map((product, index) => (
                    <div key={index}>
                      <ProductItem product={product} cols={12} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>}

          {productTypes.map((type, index) => {
            return (
              <div className="header-section header-section-simple" key={index}>
                <div className="header-section-header">
                  <div className="header-section-header-title">
                    {type.type_name}
                  </div>
                  <Link className="header-section-header-link" to="/news">
                    Xem tất cả
                  </Link>
                </div>
                <div className="header-section-content">
                  <Slider {...settings}>
                    {this.state.products.filter(product => product.product_type === type).map((product, index) => (
                      <div key={index}>
                        <ProductItem product={product} cols={12} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
);
