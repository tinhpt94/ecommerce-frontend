/**
 * Created by tinhpt on 2/21/17.
 */
import React from 'react'


export default class ProductItem extends React.Component {
  render() {
    const {id, name, image, price } = this.props;

    return(
      <div className="product-item">
        <div className="col-md-3 product-left">
          <div className="product-main">
            <Link to={"/product-detail" + id}>
              <image className="img-responsive">{image}</image>
            </Link>

            <div className="product-bottom">
              <h3>{name}</h3>
            </div>

            <h4>
              <span className="item_add">
                <span className="item-price">{price}</span>
              </span>
            </h4>
          </div>
        </div>
      </div>
    )
  }
}
