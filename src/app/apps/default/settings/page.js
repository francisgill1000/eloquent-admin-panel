"use client";

import React from "react";
import Link from "next/link";
import { FileText, Users, FileSignature, Receipt, ShoppingCart, MessageSquare } from "lucide-react";

const apps = [
  {
    name: "CRM",
    description: "Manage leads, clients, and deals",
    icon: <Users size={30} className="text-blue-500" />,
    link: "/apps/crm",
  },
  {
    name: "Invoice",
    description: "Create and send invoices easily",
    icon: <Receipt size={30} className="text-green-500" />,
    link: "/apps/invoice",
  },
  {
    name: "Proposal",
    description: "Prepare and manage client proposals",
    icon: <FileSignature size={30} className="text-purple-500" />,
    link: "/apps/proposal",
  },
  {
    name: "Quotation",
    description: "Generate quick and professional quotes",
    icon: <FileText size={30} className="text-yellow-500" />,
    link: "/apps/quotation",
  },
  {
    name: "Sales",
    description: "Track and manage your sales pipeline",
    icon: <ShoppingCart size={30} className="text-red-500" />,
    link: "/apps/sales",
  },
  {
    name: "Chat",
    description: "Communicate with team members",
    icon: <MessageSquare size={30} className="text-cyan-500" />,
    link: "/apps/chat",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-accent">Applications</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <Link
            key={app.name}
            href={app.link}
            className="border rounded-2xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl">
                {app.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
