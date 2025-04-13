"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "@/src/components/ui/chart";

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2300,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Apr",
    total: 4500,
  },
  {
    name: "May",
    total: 4100,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 5000,
  },
  {
    name: "Aug",
    total: 4800,
  },
  {
    name: "Sep",
    total: 5300,
  },
  {
    name: "Oct",
    total: 5800,
  },
  {
    name: "Nov",
    total: 4900,
  },
  {
    name: "Dec",
    total: 6100,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="#EAB308"
          radius={[4, 4, 0, 0]}
          className="fill-yellow-400"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
