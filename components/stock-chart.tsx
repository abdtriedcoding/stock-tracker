"use client";

import { chartConfig } from "@/constants";
import { StockData } from "@/lib/get-stock-data";
import { useSearchParams } from "next/navigation";
import { TrendingDown, TrendingUp } from "lucide-react";
import { stockPriceRange } from "@/lib/stockprice-range";
import { monthlyStockTrend } from "@/lib/monthly-stock-trend";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function StockChart({ stockData }: { stockData: StockData[] }) {
  const searchParams = useSearchParams();
  const currentTicker = searchParams.get("ticker");
  const currentCompany = searchParams.get("company");
  const { minValue, maxValue } = stockPriceRange(stockData);
  const monthlyTrendPercentage = monthlyStockTrend(stockData);
  const isTrendingUp = monthlyTrendPercentage > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{currentCompany ?? "Netflix Inc. Common Stock"}</CardTitle>
        <CardDescription>{currentTicker ?? "NFLX"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[500px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={stockData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                }
              />
              <YAxis
                domain={[minValue * 0.9, maxValue * 1.1]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke={chartConfig.high.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke={chartConfig.close.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke={chartConfig.low.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="font-medium leading-none">
          {isTrendingUp ? (
            <>
              Trending up by{" "}
              <span className="text-[#2DB78A]">
                {monthlyTrendPercentage.toFixed(2)}%{" "}
              </span>{" "}
              this month{" "}
              <TrendingUp className="inline text-[#2DB78A] h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by{" "}
              <span className="text-[#E2366F]">
                {monthlyTrendPercentage.toFixed(2)}%{" "}
              </span>{" "}
              this month{" "}
              <TrendingDown className="inline text-[#E2366F] h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing stock data for the last 3 months
        </div>
      </CardFooter>
    </Card>
  );
}
