export function filterBrand(productList) {
  const brandFromProduct = [];
  productList.forEach(product => brandFromProduct.push(product.brand.brand));
  const brandSet = new Set(brandFromProduct);
  return [...brandSet]
}

export function filterMadeIn(productList) {
  const madeInFromProduct = [];
  productList.forEach(product => madeInFromProduct.push(product.made_in.made_in));
  const madeInSet = new Set(madeInFromProduct);
  return [...madeInSet]
}

export function filterProductType(productList) {
  const productTypeFromProduct = [];
  productList.forEach(product => productTypeFromProduct.push(product.product_type.type_name));
  const typeSet = new Set(productTypeFromProduct);
  return [...typeSet]
}

export function filterByProps(productList, filterProps) {
  return productList.filter(product => {
    return String(product.brand.brand).includes(filterProps.brand)
      && String(product.product_type.type_name).includes(filterProps.type)
      && String(product.made_in.made_in).includes(filterProps.madeIn)
      && (filterProps.price === "" || product.price >= parseFloat(filterProps.price));
  })
}