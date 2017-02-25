/**
 * Created by tinhpt on 2/21/17.
 */
import React from 'react'
import ProductItem from './ProductItem'
import ProductStore from '../../stores/ProductStore'
import ProductService from '../../services/ProductService'
import {Pagination} from 'react-bootstrap'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  _getState() {
    return {
      products: ProductStore.fetchAll(),
      activePage: 1
    }
  }

  _onChange() {
    this.setState(this._getState())
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    ProductService.fetchAll();
  }

  componentWillUnMount() {
    ProductStore.removeChangeListener(this._onChange)
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const products = this.state.products;
    if (products !== null) {
      return (
        <div id="products">
          <div className="row">
            {
              Object.keys(products).map(productKey => {
                return <ProductItem {...this.props}
                                    key={products[productKey].id}
                                    id={products[productKey].id}
                                    name={products[productKey].name}
                                    price={products[productKey].price}
                                    image={products[productKey].imageUrl}
                />
              })}
          </div>

          <div className="row text-center" classID="pagination">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={20}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}/>
          </div>
        </div>
      )
    } else {
      return (
        <div id="products">
        </div>
      )
    }
  }
}

export default Products
