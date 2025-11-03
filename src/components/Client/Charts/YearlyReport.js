"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Function to generate random sales
const getRandomSales = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate CRM data
const generateCRMData = () => [
  { month: "Jan", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Feb", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Mar", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Apr", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "May", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Jun", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Jul", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Aug", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Sep", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Oct", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Nov", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
  { month: "Dec", leads: getRandomSales(1000, 10000), deals: getRandomSales(1000, 10000), revenue: getRandomSales(1000, 10000) },
];

const YearlyCRMLineChart = () => {
  const [crmData, setCrmData] = useState(generateCRMData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCrmData(generateCRMData()); // regenerate every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <ResponsiveContainer width="100%">
      <LineChart data={crmData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="month" stroke="#fff" />
        <YAxis stroke="#00ffcc" />
        <Tooltip stroke="#000" />
        <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="deals" stroke="#ca82acff" strokeWidth={2} />
        <Line type="monotone" dataKey="revenue" stroke="#00ffcc" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyCRMLineChart;
