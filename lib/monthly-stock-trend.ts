import { StockData } from "@/lib/get-stock-data";

export function monthlyStockTrend(stockData: StockData[]): number {
  if (stockData.length === 0) return 0;

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const recentData = stockData.filter(
    (item) => new Date(item.date).getTime() >= thirtyDaysAgo
  );

  if (recentData.length === 0) return 0;

  const firstValue = recentData[0].close;
  const lastValue = recentData[recentData.length - 1].close;

  return ((lastValue - firstValue) / firstValue) * 100;
}
