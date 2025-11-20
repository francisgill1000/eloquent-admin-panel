import { useEffect, useState } from "react";

export default function LeadSummaryCard() {
  const [leadCounts, setLeadCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/leads/summary") // Replace with your API endpoint
      .then((res) => {
        setLeadCounts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching lead summary:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6 text-white">
        Loading lead summary...
      </div>
    );
  }

  // All statuses to display
  const allStatuses = [
    "New",
    "Contacted",
    "Interested",
    "Converted-to-Deal",
    "Closed-Won",
    "Closed-Lost",
  ];

  // Progress calculation (optional: only active leads)
  const activeStatuses = ["New", "Contacted", "Interested", "Converted-to-Deal"];
  const activeTotal = activeStatuses.reduce(
    (sum, key) => sum + (leadCounts[key] || 0),
    0
  );
  const convertedTotal = leadCounts["Closed-Won"] || 0;
  const droppedTotal = leadCounts["Closed-Lost"] || 0;

  const progressPercent = Math.round(
    (convertedTotal / (activeTotal + convertedTotal + droppedTotal)) * 100
  );

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card-dark p-6 text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-black/30">
      {/* Progress Bar */}
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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-300">Active Leads Progress</span>
          <span className="font-semibold text-green-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-black/30 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {allStatuses.map((status) => (
          <StatusCard
            key={status}
            icon={getStatusIcon(status)}
            color={getStatusColor(status)}
            label={status}
            value={leadCounts[status] || 0}
          />
        ))}
      </div>
    </div>
  );
}

// Status card component
function StatusCard({ icon, color, label, value }) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-lg" style={{ color }}>
          {icon}
        </span>
        <p className="text-base font-medium leading-normal text-gray-300">
          {label}
        </p>
      </div>
      <p className="tracking-light text-2xl font-bold leading-tight text-white">
        {value}
      </p>
    </div>
  );
}

// Helper to assign icons based on status
function getStatusIcon(status) {
  switch (status) {
    case "New":
      return "person_add";
    case "Contacted":
      return "phone";
    case "Interested":
      return "heart_plus";
    case "Converted-to-Deal":
      return "star";
    case "Closed-Won":
      return "check_circle";
    case "Closed-Lost":
      return "trending_down";
    default:
      return "info";
  }
}

// Helper to assign colors based on status
function getStatusColor(status) {
  switch (status) {
    case "New":
      return "#00BFFF";
    case "Contacted":
      return "#ffd20aff";
    case "Interested":
      return "#ff0adaff";
    case "Converted-to-Deal":
      return "#FFD700";
    case "Closed-Won":
      return "#30D158";
    case "Closed-Lost":
      return "#FF453A";
    default:
      return "#888888";
  }
}
