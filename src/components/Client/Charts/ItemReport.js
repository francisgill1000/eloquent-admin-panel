"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const ItemReport = () => {
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch month-wise customer stats from backend
    const fetchCustomerStats = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("customers-stats");

            // Expected backend response:
            // [{ month: "January", total: 10 }, { month: "February", total: 7 }, ...]

            // Map data for recharts
            const formatted = data.map((item) => ({
                name: item.month.slice(0, 3), // e.g. "Jan"
                sales: item.total,
            }));

            setBarData(formatted);
        } catch (error) {
            console.error("Failed to fetch customer stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerStats();
    }, []);

    return (
        <div className="w-full  p-4 rounded-xl ">
            {loading ? (
                <p className="text-gray-400 text-sm">Loading chart...</p>
            ) : (
                <>
                    <div className="">
                        <h3 className="text-lg font-semibold text-gray-200">Customer Onboard Monthly</h3>
                    </div>

                    <ResponsiveContainer width="100%" height={300} className={"mt-5"}>
                        <BarChart
                            data={barData}
                            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.04)"
                            />
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#1a1a1a",
                                    border: "1px solid #00ffcc1a",
                                    borderRadius: "8px",
                                }}
                            />
                            <Bar dataKey="sales" fill="#00ffcc" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </>

            )}
        </div>
    );
};

export default ItemReport;
