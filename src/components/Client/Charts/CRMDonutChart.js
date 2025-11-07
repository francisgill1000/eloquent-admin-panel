"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#00ffcc", "#829fcaff", "#8884d8", "#9bead8", "#00bfa5"];

const CRMDonutChart = () => {
  const [donutData, setDonutData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const { data } = await axios.get("customers-city-wise"); // Replace with your actual endpoint
        // Transform API data to match Recharts format [{name: "Dubai", value: 100}, ...]
        const formattedData = data;
        setDonutData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={donutData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#00ffcc"
          paddingAngle={4}
          stroke="none"
        >
          {donutData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip/>
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ color: "#9bead8", fontSize: "14px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CRMDonutChart;
