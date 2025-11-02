"use client"

import YearlyReport from '@/components/Dashboard/Charts/YearlyReport';
import ItemReport from '@/components/Dashboard/Charts/ItemReport';
import Cards from '@/components/Dashboard/Cards';
import CRMTable from '@/components/Dashboard/CRMTable';
import CRMDonutChart from '@/components/Dashboard/Charts/CRMDonutChart';

export default function Dashboard() {
  return (
    <>
      <Cards />
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-xl p-4 shadow-md">
          <h3 className="text-accent mb-2 font-semibold">Users Over Time</h3>
          <div className="h-72">
            <ItemReport />
          </div>
        </div>

        <div className="border rounded-xl p-4 shadow-md">
          <h3 className="text-accent mb-2 font-semibold">Users Over Time</h3>
          <div className="h-72">
            <YearlyReport />
          </div>
        </div>
        <div className="border rounded-xl p-4 shadow-md">
          <h3 className="text-accent mb-2 font-semibold">Pending Leads</h3>
          <div className="h-72">
            <CRMTable />
          </div>
        </div>
        <div className="border rounded-xl p-4 shadow-md">
          <h3 className="text-accent mb-2 font-semibold">Users Over Time</h3>
          <div className="h-72">
            <CRMDonutChart />
          </div>
        </div>
      </div>
    </>
  );
}
