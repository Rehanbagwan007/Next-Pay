"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, BarProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DashboardChartProps {
  data: any[]; // [{ month: '2024-06', bookId1: amount, bookId2: amount, ... }, ...]
  books: { id: string; title: string }[];
}

export default function DashboardChart({ data, books }: DashboardChartProps) {
  // Assign a color to each book
  const colors = [
    "#6366f1", // indigo
    "#a21caf", // purple
    "#16a34a", // green
    "#f59e42", // orange
    "#e11d48", // pink
    "#0ea5e9", // sky
    "#facc15", // yellow
  ];
  const bookColorMap: Record<string, string> = {};
  books.forEach((book, idx) => {
    bookColorMap[book.id] = colors[idx % colors.length];
  });

  // Build chart config for ChartContainer
  const chartConfig = books.reduce((acc, book, idx) => {
    acc[book.id] = {
      label: book.title,
      color: bookColorMap[book.id],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const hasData = data && data.length > 0 && books.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Transactions by Book</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <BarChart width={typeof window !== 'undefined' && window.innerWidth > 600 ? 600 : 320} height={300} data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Legend />
              {books.map((book) => (
                <Bar
                  key={book.id}
                  dataKey={book.id}
                  name={book.title}
                  fill={bookColorMap[book.id]}
                  radius={8}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500">
            No transaction data to display.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
