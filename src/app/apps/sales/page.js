"use client";

import { useState, useEffect } from "react";
import YearlyReport from '@/components/Client/Charts/YearlyReport';
import ItemReport from '@/components/Client/Charts/ItemReport';
import CRMTable from '@/components/Client/CRMTable';
import CRMDonutChart from '@/components/Client/Charts/CRMDonutChart';
import CustomLoader from '@/components/ui/AIPlaceholderLoader';
import LeadSummaryCard from "@/components/Dashboard/LeadSummaryCard";
import DealSummaryCard from "@/components/Dashboard/DealSummaryCard";

export default function Client() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoading = new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500); // simulate delay
    });

    fakeLoading.then(() => setLoading(false));
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-6">


      <div className="border rounded-xl p-4 shadow-md">
        <div className=" flex  justify-between">
          <h3 className="text-lg font-semibold text-gray-200">Lead Summary</h3>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Live data</span>
          </div>
        </div>
        <div className="h-72">
          {loading ? <CustomLoader text="Fetching monthly onboard data..." /> : <LeadSummaryCard />}
        </div>
      </div>

      <div className="border rounded-xl p-4 shadow-md">
        <div className=" flex  justify-between">
          <h3 className="text-lg font-semibold text-gray-200">Lead Summary</h3>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Live data</span>
          </div>
        </div>
        <div className="h-72">
          {loading ? <CustomLoader text="Fetching monthly onboard data..." /> : <DealSummaryCard />}
        </div>
      </div>

      <div className="border rounded-xl p-4 shadow-md">
        <h3 className="text-accent mb-2 font-semibold">Income By Customer Onboard Monthly</h3>
        <div className="h-72">
          {loading ? <CustomLoader text="Analyzing income trends..." /> : <YearlyReport />}
        </div>
      </div>

      <div className="border rounded-xl p-4 shadow-md">
        <h3 className="text-accent mb-2 font-semibold">Customer Onboard Monthly</h3>
        <div className="h-72">
          {loading ? <CustomLoader text="Fetching monthly onboard data..." /> : <ItemReport />}
        </div>
      </div>

      <div className="border rounded-xl p-4 shadow-md">
        <h3 className="text-accent mb-5 font-semibold">Latest Customer This Month</h3>
        <div className="h-72">
          {loading ? <CustomLoader text="Loading latest customers..." /> : <CRMTable />}
        </div>
      </div>

      <div className="border rounded-xl p-4 shadow-md">
        <h3 className="text-accent mb-2 font-semibold">City Wise Customer</h3>
        <div className="h-72">
          {loading ? <CustomLoader text="Mapping customer distribution..." /> : <CRMDonutChart />}
        </div>
      </div>
    </div>
  );
}
