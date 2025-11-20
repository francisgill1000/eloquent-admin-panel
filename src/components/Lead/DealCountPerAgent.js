"use client";

import { parseApiError } from "@/lib/utils";
import { useEffect, useState } from "react";
import CustomLoader from "../ui/AIPlaceholderLoader";

const DealCountPerAgent = () => {

    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch function (search passed explicitly)
    const fetchRecords = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.get("deals/count-per-agent");

            if (data && Array.isArray(data)) {
                setRecords(data);
            } else {
                throw new Error("Invalid data structure received from API.");
            }

            setIsLoading(false);
        } catch (error) {
            console.log(parseApiError(error));
            setIsLoading(false);
        }
    };

    // Trigger fetch on search change
    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <>
            <div className="">
                <h3 className="text-lg font-semibold text-gray-200">Total Deals Per Agent</h3>
            </div>
            <div className="max-h-[300px] scrollbar-custom overflow-y-auto rounded-md mt-10">
                <table className="min-w-full text-left text-sm text-[#9bead8]">
                    <thead className="sticky top-0 bg-[#121212] z-10">
                        <tr className="border-b border-[#00ffcc33]">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Total Lead</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="p-12 text-center text-primary font-medium bg-[#121212]"
                                >
                                    <div className="flex items-center justify-center">
                                        <CustomLoader />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            records.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-[#00ffcc11] hover:bg-[#00ffcc1a] transition-colors ${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"
                                        }`}
                                >
                                    <td className="px-4 py-2">{item.agent_name}</td>
                                    <td className="px-4 py-2">{item.deal_count}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default DealCountPerAgent;
