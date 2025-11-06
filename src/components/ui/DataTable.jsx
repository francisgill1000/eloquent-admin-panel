"use client";

import { Loader2 } from "lucide-react";
import CustomLoader from "./AIPlaceholderLoader";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  error = null,
  emptyMessage = "No data found.",
  onRowClick = () => { },
  pagination = null,
}) {

  return (

    <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-200  flex flex-col">
      {/* Table wrapper */}
      <div className="overflow-x-auto overflow-y-auto flex-1 scrollbar-custom">
        <table className="w-full text-left table-auto">
          <thead className="bg-[#1b1b1b] border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="p-4 font-semibold text-xs text-muted/100 uppercase tracking-wider min-w-[150px]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800 bg-[#121212]">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-primary font-medium bg-[#121212]"
                >
                  <div className="flex items-center justify-center h-[60vh]">
                    <CustomLoader />
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-red-400 font-medium bg-[#121212]"
                >
                  <p>Error: {error}</p>
                  <p className="mt-2 text-sm text-red-500">
                    Please check the console or refresh the page.
                  </p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-gray-500 font-medium bg-[#121212] "
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr
                  key={i}
                  className="border-y border-[#00ffcc1a] hover:bg-[#1f1f1f] transition-colors cursor-pointer bg-[#1b1b1b]"
                  onClick={() => onRowClick(item)}
                >
                  {columns.map((col, j) => (
                    <td
                      key={j}
                      className="p-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      {col.render ? col.render(item) : item[col.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination sticky at bottom */}
      {pagination && (
        <div className="">
          {pagination}
        </div>
      )}
    </div>
  );
}