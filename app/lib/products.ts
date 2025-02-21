import productsJSON from "./products.json";

interface Product {
  id: number;
}

export const getAllProducts = () => productsJSON.products;

export const getProductUrl = (product: Product) => `/products/${product.id}`;
