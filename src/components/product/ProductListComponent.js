import React, { Component } from "react";
import ProductItem from "./ProductItem";
import { Pagination } from "react-bootstrap";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

class ProductListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemParPage: 12
    };
  }

  handleSelectPage = eventKey => {
    this.setState({
      activePage: eventKey
    });
  };

  handleChangeItem = (event, index, value) =>
    this.setState({
      itemParPage: value
    });

  render() {
    const { productList, onDelete } = this.props;
    const { activePage, itemParPage } = this.state;
    const items = productList && productList.length > 0
      ? Math.ceil(productList.length / itemParPage)
      : 0;
    return (
      <div className="product-items">
        <div className="row">
          {productList
            .slice((activePage - 1) * itemParPage, activePage * itemParPage)
            .map(product => {
              return (
                <ProductItem
                  {...this.props}
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                />
              );
            })}
        </div>

        <div className="row">
          <div className="col-md-3">
            <DropDownMenu
              value={this.state.itemParPage}
              onChange={this.handleChangeItem}
            >
              <MenuItem value={12} primaryText="12 sản phẩm mỗi trang" />
              <MenuItem value={24} primaryText="24 sản phẩm mỗi trang" />
              <MenuItem value={48} primaryText="48 sản phẩm mỗi trang" />

            </DropDownMenu>
          </div>
          <div className="col-md-9 text-right">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={items}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelectPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListComponent;
