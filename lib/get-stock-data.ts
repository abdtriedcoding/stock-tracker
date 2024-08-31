import { formatDate } from "@/lib/format-date";

export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const [formattedStartDate, formattedEndDate] = [
  new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 days ago
  new Date(), // today
].map((date) => formatDate(date));

export async function getStockData(ticker: string): Promise<StockData[]> {
  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formattedStartDate}/${formattedEndDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
  );

  const data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error(
      "Oops! The stock data took a vacation. 🏖️ Failed to fetch it!"
    );
  }

  const stockData: StockData[] = data.results.map((item: any) => ({
    date: new Date(item.t).toISOString().split("T")[0],
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
  }));

  return stockData;
}
