"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Home,
  FileText,
  Users,
  BarChart2,
  Settings,
  ShoppingCart,
  Calendar,
  MessageSquare,
  CreditCard,
  Bell,
  AppWindowIcon,
  Receipt,
  FileSignature,
  Briefcase,
  Banknote,
  PencilLine,
  Pen,
  WindIcon,
  AppWindow,
  Menu,
  ChartArea,
  Users2Icon,
  TentIcon,
  UserIcon,
  CircleQuestionMark,
  User2,
  Building,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = {
  default: [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Apps", href: "/apps/default", icon: <AppWindow size={20} /> },
    { name: "Billing", href: "/apps/default/billings", icon: <Banknote size={20} /> },
    { name: "Requests", href: "/apps/default/requests", icon: <Pen size={20} /> },
    { name: "Settings", href: "/apps/default/settings", icon: <Settings size={20} /> },
  ],
  clients: [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Dashboard", href: "/apps/clients", icon: <ChartArea size={20} /> },
    { name: "Clients", href: "/apps/clients/list", icon: <AppWindow size={20} /> },
  ],
  sales: [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Dashboard", href: "/apps/crm", icon: <AppWindow size={20} /> },
    { name: "Agents", href: "/apps/sales/agents", icon: <UserIcon size={20} /> },
    { name: "Customers", href: "/apps/sales/customers", icon: <UserIcon size={20} /> },
    { name: "Leads", href: "/apps/sales/leads", icon: <Banknote size={20} /> },
    { name: "Deals", href: "/apps/sales/deals", icon: <BarChart2 size={20} /> },
  ],
  invoice: [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Invoices", href: "/apps/invoice", icon: <Receipt size={20} /> },
    { name: "Clients", href: "/apps/invoice/clients", icon: <Users size={20} /> },
    { name: "Payments", href: "/apps/invoice/payments", icon: <CreditCard size={20} /> },
    { name: "Reports", href: "/apps/invoice/reports", icon: <FileText size={20} /> },
    { name: "Settings", href: "/apps/invoice/settings", icon: <Settings size={20} /> },
  ],
  proposal: [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Proposals", href: "/apps/proposal", icon: <FileSignature size={20} /> },
    { name: "Clients", href: "/apps/proposal/clients", icon: <Users size={20} /> },
    { name: "Templates", href: "/apps/proposal/templates", icon: <FileText size={20} /> },
    { name: "Calendar", href: "/apps/proposal/calendar", icon: <Calendar size={20} /> },
    { name: "Settings", href: "/apps/proposal/settings", icon: <Settings size={20} /> },
  ],
};

const Nav = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  // ✅ Extract only first part after /apps/
  const appSegment = pathname.split("/apps/")[1];
  const currentApp = appSegment ? appSegment.split("/")[0] : "default";

  const currentMenu = menus[currentApp] || menus["default"];

  const checkAuth = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    setShowSidebar(!!(user && token));
  };

  useEffect(() => {
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  if (!showSidebar) return null;

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`flex flex-col ${!sidebarOpen && 'items-center'} border-r overflow-hidden`}
    >
      {/* Header */}
      <nav style={{ padding: '16.8px' }} className={`flex flex-col gap-3 ${sidebarOpen && 'bg-[#1b1b1b]'}  border-b`}>
        <div className="flex justify-between items-center gap-3 text-gray-300 hover:text-[#00ffcc] transition-all">
          {sidebarOpen && <span className="font-semibold capitalize">{currentApp} App</span>}
          <Menu onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer" />
        </div>
      </nav>

      {/* Dynamic Menu */}
      <nav className="flex flex-col p-4 gap-3">
        {currentMenu.map((item, i) => (
          <Link key={i} href={item.href}>
            <button
              className={`flex items-center gap-3 text-gray-300 hover:text-[#00ffcc] transition-all ${pathname === item.href ? "text-[#00ffcc]" : ""
                }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Nav;
