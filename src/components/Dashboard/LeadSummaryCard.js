export const leads_status = [
  { id: "New", name: "New" },
  { id: "Contacted", name: "Contacted" },
  { id: "Interested", name: "Interested" },
  { id: "Closed-Won", name: "Closed-Won" },
  { id: "Closed-Lost", name: "Closed-Lost" },
];

// Sample counts — replace these from API
const leadCounts = {
  New: 40,
  Contacted: 25,
  Interested: 20,
  "Closed-Won": 30,
  "Closed-Lost": 5,
};

// Derived values
const activeTotal =
  leadCounts.New + leadCounts.Contacted + leadCounts.Interested;

const convertedTotal = leadCounts["Closed-Won"];
const droppedTotal = leadCounts["Closed-Lost"];

const progressPercent = Math.round(
  (convertedTotal / (activeTotal + droppedTotal + convertedTotal)) * 100
);

export default function LeadSummaryCard() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card-dark p-6 text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-black/30">


      {/* Progress Bar */}
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

      {/* Status Blocks */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* New */}
        <StatusCard
          icon="add"
          color="#0A84FF"
          label="New"
          value={leadCounts.New}
        />

        {/* Contacted */}
        <StatusCard
          icon="phone"
          color="#ffd20aff"
          label="Contacted"
          value={leadCounts.Contacted}
        />

        {/* Interested */}
        <StatusCard
          icon="heart_plus"
          color="#ff0adaff"
          label="Interested"
          value={leadCounts.Interested}
        />

        {/* Converted */}
        <StatusCard
          icon="check_circle"
          color="#30D158"
          label="Closed-Won"
          value={convertedTotal}
        />
      </div>

      {/* Dropped */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF453A]/20">
            <span className="material-symbols-outlined text-xl text-[#FF453A]">
              trending_down
            </span>
          </div>
          <div>
            <p className="text-base font-medium leading-normal text-gray-300">
              Closed-Lost
            </p>
            <p className="text-xs text-gray-400">Leads that did not convert</p>
          </div>
        </div>
        <p className="tracking-light text-3xl font-bold leading-tight text-white">
          {droppedTotal}
        </p>
      </div>
    </div>
  );
}

// Status card component (same design)
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
