"use client";

import { parseApiError } from "@/lib/utils";
import { useEffect, useState } from "react";
import CustomLoader from "../ui/AIPlaceholderLoader";

const CRMTable = () => {

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch function (search passed explicitly)
  const fetchRecords = async () => {
    try {
      setIsLoading(true);

      const params = { page: 1, per_page: 10 };
      const { data } = await axios.get("customers", { params });

      if (data && Array.isArray(data.data)) {
        setRecords(data.data);
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

    <div className="max-h-[300px] scrollbar-custom overflow-y-auto rounded-md">
      <table className="min-w-full text-left text-sm text-[#9bead8]">
        <thead className="sticky top-0 bg-[#121212] z-10">
          <tr className="border-b border-[#00ffcc33]">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Whatsapp</th>
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
                key={item.id}
                className={`border-b border-[#00ffcc11] hover:bg-[#00ffcc1a] transition-colors ${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"
                  }`}
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.whatsapp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

  );
};

export default CRMTable;
