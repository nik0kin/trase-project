import { calcProductsTotalCost } from "./products";

describe('Lib -> Products', () => {
  describe('calcProductsTotalCost()', () => {
    it("should calculate correctly", () => {
      expect(calcProductsTotalCost([])).toEqual(0);
      expect(calcProductsTotalCost([{id: 1001, price: 22.5}])).toEqual(22.5);
      expect(calcProductsTotalCost([{id: 1001, price: 22.5}, {id: 1002, price: 100}, {id: 1003, price: 20000}])).toEqual(20122.5);
    });
  });
});

