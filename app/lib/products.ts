import productsJSON from './products.json';

export interface Product {
  id: number;
  price: number;
}

export const getAllProducts = () => productsJSON.products;

export const getProductUrl = (product: Product) => `/products/${product.id}`;

export const calcProductsTotalCost = (products: Product[]) => {
  return products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
};
