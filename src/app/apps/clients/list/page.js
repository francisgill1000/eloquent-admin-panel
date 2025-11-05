"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { parseApiError } from "@/lib/utils";
import Pagination from "@/lib/Pagination";
import DataTable from "@/components/ui/DataTable";
import Columns from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AttendanceTable() {
  const [employees, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination & search
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [total, setTotalAttendance] = useState(0);

  const [speaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, [currentPage, perPage, search]);

  useEffect(() => {
    if (isLoading) {
      const utterance = new SpeechSynthesisUtterance("Loading client data...");
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = "en-US";

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [isLoading]);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const params = { page: currentPage, per_page: perPage, search };

      const { data } = await axios.get("customers", { params });

      if (data && Array.isArray(data.data)) {
        setAttendance(data.data);
        setCurrentPage(data.current_page || 1);
        setTotalAttendance(data.total || 0);
      } else {
        throw new Error("Invalid data structure received from API.");
      }
      setIsLoading(false);
    } catch (error) {
      setError(parseApiError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-accent font-semibold text-lg flex items-center">
          Clients
          <RefreshCw
            onClick={fetchRecords}
            className={`w-5 h-5 ml-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {speaking && (
            <span
              className="ml-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"
              title="Speaking"
            ></span>
          )}
        </h3>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0f0f0f] text-white p-2 rounded-lg outline-none border border-[#00ffcc1a] focus:border-[#00ffcc] w-48 md:w-64"
          />

          <Button
            onClick={fetchRecords}
            className="bg-muted/50 text-white rounded-lg font-semibold shadow-md hover:bg-muted/70 transition-all"
          >
            New Client
          </Button>
        </div>
      </div>

      <DataTable
        columns={Columns}
        data={employees}
        isLoading={isLoading}
        error={error}
        onRowClick={(item) => console.log("Clicked:", item)}
        pagination={
          <Pagination
            page={currentPage}
            perPage={perPage}
            total={total}
            onPageChange={setCurrentPage}
            onPerPageChange={(n) => {
              setPerPage(n);
              setCurrentPage(1);
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        }
      />
    </div>
  );
}
