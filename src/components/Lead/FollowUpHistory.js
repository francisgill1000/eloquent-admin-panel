"use client";
import React from "react";

// ===== MAIN COMPONENT =====
export default function FollowUpHistory({ name, activities }) {
  return (
    <div className="flex flex-col w-full max-w-2xl h-auto max-h-[90vh] bg-[#1A1D1A] rounded-xl shadow-2xl overflow-hidden">
      <Header name={name} />
      <Timeline activities={activities} />
    </div>
  );
}

// ===== HEADER COMPONENT =====
function Header({ name }) {
  return (
    <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
      <div className="flex flex-col gap-1">
        <p className="text-[#E0E0E0] text-xl font-bold">{`Follow-Up History for ${name}`}</p>
        <p className="text-[#9E9E9E] text-sm">A chronological record of all activities and interactions.</p>
      </div>
      <button className="p-2 text-[#9E9E9E] hover:text-white rounded-full hover:bg-white/10 transition-colors">
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>
    </div>
  );
}

// ===== TIMELINE CONTAINER =====
function Timeline({ activities }) {
  if (!activities || activities.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-grow overflow-y-auto px-6 py-4">
      <div className="grid grid-cols-[auto_1fr] gap-x-4">
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ===== TIMELINE ITEM =====
function TimelineItem({ activity, isLast }) {
  const statusColors = {
    green: "bg-[#8BC34A]/20 text-[#8BC34A]",
    orange: "bg-orange-500/20 text-orange-400",
  };

  return (
    <>
      {/* Icon and vertical line */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center w-10 h-10 bg-[#004D40] rounded-full ring-4 ring-[#1A1D1A]">
          <span className="material-symbols-outlined text-[#8BC34A] text-2xl">{activity.type}</span>
        </div>
        {!isLast && <div className="w-px bg-[#004D40] grow"></div>}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 pt-2">
        <p className="text-[#E0E0E0] text-base font-medium">{activity.title}</p>
        <p className="text-[#9E9E9E] text-sm mb-2">{`by ${activity.by}`}</p>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#9E9E9E] text-base">calendar_today</span>
          <p className="text-[#9E9E9E] text-sm">{activity.datetime}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mt-3 ${
            statusColors[activity.statusColor]
          }`}
        >
          {activity.status}
        </span>
      </div>
    </>
  );
}

// ===== EMPTY STATE =====
function EmptyState() {
  return (
    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
      <span className="material-symbols-outlined text-5xl text-[#9E9E9E] mb-4">history_toggle_off</span>
      <p className="text-[#E0E0E0] text-lg font-medium">No activities recorded yet.</p>
      <p className="text-[#9E9E9E] text-sm">Start a follow-up to see its history here.</p>
    </div>
  );
}
