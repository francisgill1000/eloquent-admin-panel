"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

// Function to generate a random number between min and max
const getRandomSales = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate new bar data
const generateBarData = () => [
    { name: "Jan", sales: getRandomSales(1000, 10000) },
    { name: "Feb", sales: getRandomSales(1000, 10000) },
    { name: "Mar", sales: getRandomSales(1000, 10000) },
    { name: "Apr", sales: getRandomSales(1000, 10000) },
    { name: "May", sales: getRandomSales(1000, 10000) },
    { name: "Jun", sales: getRandomSales(1000, 10000) },
    { name: "Jul", sales: getRandomSales(1000, 10000) },
    { name: "Aug", sales: getRandomSales(1000, 10000) },
    { name: "Sep", sales: getRandomSales(1000, 10000) },
    { name: "Oct", sales: getRandomSales(1000, 10000) },
    { name: "Nov", sales: getRandomSales(1000, 10000) },
    { name: "Dec", sales: getRandomSales(1000, 10000) },
];

const ItemReport = () => {

    const [barData, setBarData] = useState(generateBarData());

    useEffect(() => {
        const interval = setInterval(() => {
            setBarData(generateBarData()); // regenerate data every 3 seconds
        }, 3000);

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Bar dataKey="sales" fill="#00ffcc" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ItemReport;
