// import productsJSON from './products.json';

export interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
}

// export const getAllProducts = () => productsJSON.products;

const pretendCache = async <T>(callback: () => Promise<T>) => {
  // Imagine we're caching the value "somewhere"
  return callback();
}

export const getAllProducts2 = async () => {
  let products: Product[] = [];

  try {
    const data = await pretendCache(async () => {
      const response = await fetch('https://dummyjson.com/products');
      return await response.json() as {products: Product[]};
    });
    products = data?.products ?? products;
  } catch (e) {
    console.error('getAllProducts() fetch failed', e);
  }

  return products ?? [];
};

export const getProductUrl = (product: Product) => `/products/${product.id}`;

export const calcProductsTotalCost = (products: Product[]) => {
  return products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
};
