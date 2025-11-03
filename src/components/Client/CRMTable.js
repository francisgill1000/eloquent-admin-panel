"use client";

const CRMTable = () => {
  // Example CRM data
  const crmData = [
    { id: 1, leadName: "John Doe", status: "New", assignedTo: "Alice", value: "$1,200", date: "2025-11-01" },
    { id: 2, leadName: "Jane Smith", status: "Contacted", assignedTo: "Bob", value: "$3,400", date: "2025-11-02" },
    { id: 3, leadName: "Michael Brown", status: "Qualified", assignedTo: "Charlie", value: "$2,800", date: "2025-11-03" },
    { id: 4, leadName: "Emily Johnson", status: "Won", assignedTo: "Alice", value: "$5,000", date: "2025-11-04" },
    { id: 5, leadName: "William Lee", status: "Lost", assignedTo: "Bob", value: "$0", date: "2025-11-05" },
  ];

  return (
     <table className="min-w-full text-left text-sm text-[#9bead8]">
        <thead>
          <tr className="border-b border-[#00ffcc33]">
            <th className="px-4 py-2">Lead Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {crmData.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b border-[#00ffcc11] hover:bg-[#00ffcc1a] transition-colors ${
                index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"
              }`}
            >
              <td className="px-4 py-2">{item.leadName}</td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="px-4 py-2">{item.assignedTo}</td>
              <td className="px-4 py-2">{item.value}</td>
              <td className="px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default CRMTable;
