"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Example data for CRM donut chart (e.g., Leads by Status)
const donutData = [
  { name: "Dubai", value: 400 },
  { name: "Sharjah", value: 300 },
  { name: "Ajman", value: 200 },
  { name: "Abu Dhabi", value: 100 },
  { name: "RAK", value: 50 },
];

// Colors matching the dashboard theme
const COLORS = ["#00ffcc", "#829fcaff", "#8884d8", "#9bead8", "#00bfa5"];

const CRMDonutChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={donutData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60} // donut hole
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
