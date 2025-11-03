"use client";

import React, { useState, useEffect, useCallback } from 'react';

import { parseApiError } from '@/lib/utils';

import Pagination from '@/lib/Pagination';
import DataTable from '@/components/ui/DataTable';
import Columns from "./columns";

export default function AttendanceTable() {

  // filters

  const [employees, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [total, setTotalAttendance] = useState(0);


  useEffect(() => {
    fetchRecords();
  }, [currentPage, perPage]);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);

      const params = {
        page: currentPage,
        per_page: perPage,
      };

      const { data } = await axios.get("customers");

      console.log(data.data);


      // Check if result has expected structure before setting state
      if (data && Array.isArray(data.data)) {
        setAttendance(data.data);
        setCurrentPage(data.current_page || 1);
        setTotalAttendance(data.total || 0);
        setIsLoading(false);
        return; // Success, exit
      } else {
        // If the API returned a 2xx status but the data structure is wrong
        throw new Error('Invalid data structure received from API.');
      }

    } catch (error) {
      setError(parseApiError(error))
      setIsLoading(false); // Make sure loading state is turned off on error
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center space-x-3 space-y-2 mb-2 sm:space-y-0">
        <h1 className="text-2xl font-extrabold flex items-center">
          {/* <User className="w-7 h-7 mr-3 text-indigo-600" /> */}
          Clients
        </h1>

        {/* <div className="flex flex-col">
                    <DropDown
                        placeholder={'Select Branch'}
                        onChange={setSelectedBranch}
                        value={selectedBranch}
                        items={branches}
                    />
                </div> */}


        {/* Refresh Button */}
        {/* <button onClick={fetchRecords} className="bg-primary text-white px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2 whitespace-nowrap">
                    <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Submit
                </button> */}

        {/* <EmployeeExtras data={employees} onUploadSuccess={fetchRecords} /> */}
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
    </>
  );
}