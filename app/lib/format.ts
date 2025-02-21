export const formatPrice = (price: number) => {
  return '$' + (Math.round(price * 100) / 100).toFixed(2);
};
