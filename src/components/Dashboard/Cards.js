"use client";

import { useEffect, useState } from "react";

const Cards = () => {

  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [dueInvoices, setDueInvoices] = useState([]);
  const [dueInvoicesSum, setDueInvoicesSum] = useState(0);

  useEffect(() => {
    const fetchInvoices = async () => {

      let config = {
        parmas: {
          order_by: "updated_at",
          order: "desc",
        }
      };

      let res = await axios.get("invoices", config);

      let invoices = res.data.data;

      console.log(invoices);
      

      let paidInvoices = invoices.filter(inv => inv.status === 'Paid');

      let pendingInvoices = invoices.filter(inv => inv.status === 'Pending' && inv.remaining_days_count > 0);

      let dueInvoices = invoices.filter(inv => inv.status === 'Overdue');

      const dueInvoicesSum = dueInvoices.reduce((acc, cur) => acc + parseFloat(cur.total.replace(/,/g, '')), 0);

      // Format as UAE Dirham
      let formatted = new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED'
      }).format(dueInvoicesSum);


      setDueInvoicesSum(formatted);

      setPendingInvoices(pendingInvoices);
      setPaidInvoices(paidInvoices);
      setDueInvoices(dueInvoices);
      console.log("🚀 ~ fetchInvoices ~ dueInvoices:", dueInvoices)

    };
    fetchInvoices();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-xl p-4 shadow-md">
          <p className="text-[#9bead8] text-sm">Total Leads</p>
          <h3 className="text-2xl font-bold mt-1">1,320</h3>
          <span className="text-xs text-gray-400">+15% vs last month</span>
        </div>

        <div className="border rounded-xl p-4 shadow-md">
          <p className="text-[#9bead8] text-sm">Deals Closed</p>
          <h3 className="text-2xl font-bold mt-1">420</h3>
          <span className="text-xs text-gray-400">+8% MoM</span>
        </div>

        <div className="border rounded-xl p-4 shadow-md">
          <p className="text-[#9bead8] text-sm">Revenue</p>
          <h3 className="text-2xl font-bold mt-1">$48,320</h3>
          <span className="text-xs text-gray-400">+$3,200 today</span>
        </div>

        <div className="border rounded-xl p-4 shadow-md">
          <p className="text-[#9bead8] text-sm">Conversion Rate</p>
          <h3 className="text-2xl font-bold mt-1">32%</h3>
          <span className="text-xs text-gray-400">+2% vs last month</span>
        </div>
      </div>
    </>
  );
};

export default Cards;
