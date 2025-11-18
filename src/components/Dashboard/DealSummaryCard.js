export const deals_status = [
  { id: "Open", name: "Open" },
  { id: "Negotiation", name: "Negotiation" },
  { id: "Closed-Won", name: "Closed-Won" },
  { id: "Closed-Lost", name: "Closed-Lost" },
];

// Sample counts (replace with API)
const dealCounts = {
  Open: 50,
  Negotiation: 20,
  "Closed-Won": 15,
  "Closed-Lost": 8,
};

// Derived
const activeTotal = dealCounts.Open + dealCounts.Negotiation;
const convertedTotal = dealCounts["Closed-Won"];
const droppedTotal = dealCounts["Closed-Lost"];

const progressPercent = Math.round(
  (convertedTotal / (activeTotal + convertedTotal + droppedTotal)) * 100
);

export default function DealSummaryCard() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card-dark p-6 text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-black/30">

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-300">Deals Progress</span>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Open */}
        <StatusCard
          icon="folder_open"
          color="#0A84FF"
          label="Open"
          value={dealCounts.Open}
        />

        {/* Negotiation */}
        <StatusCard
          icon="handshake"
          color="#ffd20aff"
          label="Negotiation"
          value={dealCounts.Negotiation}
        />

        {/* Closed-Won */}
        <StatusCard
          icon="check_circle"
          color="#30D158"
          label="Closed-Won"
          value={dealCounts["Closed-Won"]}
        />

     
      </div>

      {/* Dropped Row */}
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
            <p className="text-xs text-gray-400">Deals that did not close</p>
          </div>
        </div>
        <p className="tracking-light text-3xl font-bold leading-tight text-white">
          {droppedTotal}
        </p>
      </div>

    </div>
  );
}

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
