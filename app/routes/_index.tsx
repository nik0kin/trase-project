import type { MetaFunction } from "@remix-run/node";
import { FC, ReactNode, useMemo, useState } from "react";

import { calcProductsTotalCost, getAllProducts, getProductUrl } from "../lib/products";
import { formatPrice } from '../lib/format';

export const meta: MetaFunction = () => {
  return [
    { title: "Marketplace Products" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const products = getAllProducts();

  const [sortDirection, setSortDirection] = useState(true); // true = ascending
  const [sortType, setSortType] = useState<'alpha' | 'price'>('alpha');

  const sortedProducts = useMemo(() => {

    return [...products].sort((p1, p2) => {
      if (sortType === 'alpha') return sortDirection ? p1.title.localeCompare(p2.title) : p2.title.localeCompare(p1.title); // could DRY with Math.abs
      if (sortType === 'price') return sortDirection ? p1.price - p2.price : p2.price - p1.price; 

      return 0;
    });
  }, [products, sortDirection, sortType]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header>
          <h1>Welcome to Marketplace</h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What do you want to buy next?
          </p>
          <div className="flex gap-2">
            <SortButton
              onClick={() => {
                if (sortType === "alpha") {
                  setSortDirection((direction) => !direction);
                  return;
                }
                setSortType("alpha");
              }}
            >
              Sort By Alpha - {sortType === 'alpha' ? (sortDirection ? 'V' : '^') : null}
            </SortButton>
            <SortButton
              onClick={() => {
                if (sortType === "price") {
                  setSortDirection((direction) => !direction);
                  return;
                }
                setSortType("price");
              }}
            >
              Sort By Price - {sortType === 'price' ? (sortDirection ? 'V' : '^') : null}
            </SortButton>
          </div>
        </nav>
        <div>
          <ul>
            {sortedProducts.map((product) => (
              <li key={product.id}>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href={getProductUrl(product)}
                >
                  {/* {icon} */}
                  {product.brand}
                  <strong>{product.title}</strong>
                  <strong>{formatPrice(product.price)}</strong>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>You want to buy all {products.length} products?</h2>
          <br/>
          <button className="p-3 border border-solid" style={{fontSize: '2rem'}} onClick={() => alert('we love alerts')}>Ok - Total: {formatPrice(calcProductsTotalCost(products))}</button>
        </div>
      </div>
    </div>
  );
}

const SortButton: FC<{ children: ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button className="p-2 border border-solid border-black" onClick={onClick}>{children}</button>
);
