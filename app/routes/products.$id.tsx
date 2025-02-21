import type { MetaFunction } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import React from 'react';

import { formatPrice } from '../lib/format';
import { getAllProducts } from "../lib/products";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Page" },
    { name: "description", content: "blah blah product seo" },
  ];
};

export default function Index() {
  const {
    params: { id: productId },
  } = useMatches()[1];
  const product = getAllProducts().find((p) => p.id === Number(productId));

  if (!product) return <div>Not Found</div>;

  return (
    <div className="flex h-screen items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-16">
        <h1>
          {product?.brand} {product?.title} - <strong>{formatPrice(product.price)}</strong>
        </h1>
        <p>{product?.description}</p>
        <small>{JSON.stringify(product)}</small>

        <button className="p-1 border border-solid">
          Big fancy unimplemented Add to Cart Button
        </button>

        <a href="/" style={{ color: "blue" }}>
          Back to All Products
        </a>
      </div>
    </div>
  );
}
