import { StockData } from "@/lib/get-stock-data";

export function stockPriceRange(stockData: StockData[]): {
  minValue: number;
  maxValue: number;
} {
  const minValue = Math.min(
    ...stockData.map((data) => Math.min(data.open, data.close))
  );

  const maxValue = Math.max(
    ...stockData.map((data) => Math.max(data.open, data.close))
  );

  return { minValue, maxValue };
}
