/**
 * Created by tinhpt on 2/21/17.
 */
import React from 'react'
import ProductItem from './ProductItem'

class Products extends React.Component {
  render() {
    const products = this.props.products;

    return(
      Object.keys(products).map(productKey => {
        return <ProductItem {...this.props}
                            key={productKey}
                            id={products[productKey].id}
                            name={products[productKey].name}
                            price={products[productKey].price}
                            image={products[productKey].images[0]}
        />
      })
    )
  }
}
