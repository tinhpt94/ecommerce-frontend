/**
 * Created by tinhpt on 2/21/17.
 */
import React from 'react'
import {Link} from 'react-router'

export default class ProductItem extends React.Component {
  render() {
    const {id, name, image, price } = this.props;

    return(
      <div className="product-item">
        <div className="col-md-3">
          <div className="product-main">
            <Link to={"/product-detail" + id}>
              <img className="img-responsive" src={image}/>
            </Link>

            <div className="product-bottom">
              <h3>{name}</h3>
              <h4>
              <span className="item_add">
                <span className="item-price">{price}</span>
              </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
