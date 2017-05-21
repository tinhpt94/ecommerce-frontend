export function filterBrand(productList) {
  const brandFromProduct = [];
  productList.forEach(product => brandFromProduct.push(product.brand.brand));
  const brandSet = new Set(brandFromProduct);
  return [...brandSet].sort((a, b) => (a > b ? 1 : -1));
}

export function filterMadeIn(productList) {
  const madeInFromProduct = [];
  productList.forEach(product =>
    madeInFromProduct.push(product.made_in.made_in)
  );
  const madeInSet = new Set(madeInFromProduct);
  return [...madeInSet].sort((a, b) => (a > b ? 1 : -1));
}

export function filterProductType(productList) {
  const productTypeFromProduct = [];
  productList.forEach(product =>
    productTypeFromProduct.push(product.product_type.type_name)
  );
  const typeSet = new Set(productTypeFromProduct);
  return [...typeSet].sort((a, b) => (a > b ? 1 : -1));
}

export function filterByProps(productList, filterProps) {
  return productList.filter(product => {
    return (
      String(product.brand.brand).includes(filterProps.brand) &&
      String(product.product_type.type_name).includes(filterProps.type) &&
      String(product.made_in.made_in).includes(filterProps.madeIn) &&
      (filterProps.price === "" ||
        product.price >= parseFloat(filterProps.price)) &&
      (filterProps.rating === "" ||
        product.rating >= parseFloat(filterProps.rating)) &&
      (filterProps.discount === "" ||
        product.discount >= parseInt(filterProps.discount))
    );
  });
}

function sortByNameAZ(productList) {
  return productList.sort((a, b) => (a.name > b.name ? 1 : -1));
}

function sortByPriceLowToHigh(productList) {
  return productList.sort((a, b) => (a.price > b.price ? 1 : -1));
}

function sortByPriceHighToLow(productList) {
  return productList.sort((a, b) => (b.price > a.price ? 1 : -1));
}

function sortByDiscount(productList) {
  return productList.sort((a, b) => (b.discount > a.discount ? 1 : -1));
}

function sortByCreatedDate(productList) {
  return productList.sort((a, b) => (b.created_date > a.created_date ? 1 : -1));
}

export function sortProduct(key, productList) {
  if (productList.length === 0) return [];
  else {
    switch (key) {
      case "newest":
        return sortByCreatedDate(productList);
        break;
      case "discount":
        return sortByDiscount(productList);
        break;
      case "price-low-to-high":
        return sortByPriceLowToHigh(productList);
        break;
      case "price-high-to-low":
        return sortByPriceHighToLow(productList);
        break;
      case "name-a-z":
        return sortByNameAZ(productList);
        break;
      default:
        break;
    }
  }
}

export function titleDropDownOrder(orderBy) {
    let order = '';
    switch (orderBy) {
      case "newest":
        order = "Hàng mới nhập";
        break;
      case "discount":
        order = "Giảm giá nhiều nhất";
        break;
      case "price-low-to-high":
        order = "Giá: Từ thấp đến cao";
        break;
      case "price-high-to-low":
        order = "Giá: Từ cao đến thấp";
        break;
      case "name-a-z":
        order = "Sắp xếp theo tên: A-Z";
        break;
      default:
        order = "Sắp xếp sản phẩm";
        break;
    }
    return order;
}
