import React, { Component } from "react";
import ProductItem from "./ProductItem";
import { Pagination } from "react-bootstrap";

class ProductListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const { productList, onDelete } = this.props;
    return (
      <div className="product-items">
        <div className="row">
          {Object.keys(productList).map(productKey => {
            return (
              <ProductItem
                {...this.props}
                key={productKey}
                product={productList[productKey]}
                onDelete={onDelete}
              />
            );
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
            onSelect={this.handleSelect}
          />
        </div>
      </div>
    );
  }
}

export default ProductListComponent;
