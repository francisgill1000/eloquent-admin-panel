// columns.js
"use client";


import { useState } from "react";
import { Clock, Handshake, MoreVertical, PenBox, Trash2 } from "lucide-react";

import { parseApiError } from "@/lib/utils";
import Followups from "./Followups";
import EditDeal from "./Edit";

function OptionsMenu({ endpoint, item, pageTitle, onSuccess = (e) => { e } }) {
    const [openEdit, setOpenEdit] = useState(false);

    const onDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return; // exit if user cancels
        try {
            await axios.delete(`${endpoint}/${item.id}`);

            onSuccess({ title: `${pageTitle} Deleted`, description: `${pageTitle} Deleted successfully` }); actualSetOpen(false);
            setOpenEdit(false); // close menu
        } catch (error) {
            console.log(parseApiError(error));
        }
    };

    const handleSuccess = (e) => {
        onSuccess(e); // refresh parent data
        setOpenEdit(false);
    }

    return (
        <div className="relative">
            <MoreVertical
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => setOpenEdit(!openEdit)}
            />

            {openEdit && (
                <div className="absolute mt-2 w-50px bg-primary text-whtie border shadow-lg z-10">
                    <EditDeal
                        endpoint={endpoint}
                        pageTitle={pageTitle}
                        item={item}
                        onSuccess={handleSuccess}
                    />

                    <Followups
                        endpoint={endpoint}
                        pageTitle={pageTitle}
                        dealId={item.id}
                        item={item}
                        onSuccess={handleSuccess}
                    />

                    <button
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <Trash2 size={20} /> Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Columns({ endpoint, pageTitle, onSuccess = (e) => { e } } = {}) {

    const statusColors = {
        "Open": "bg-green-500/10 border text-green-400 hover:bg-green-500/20 animate-pulse-slow",
        Contacted: "bg-blue-500/10  text-blue-400 hover:bg-blue-500/20",
        Interested: "bg-yellow-500/10  text-yellow-400 hover:bg-yellow-500/20",

        "Closed-Won": "bg-gray-500/10  text-gray-100 hover:bg-green-500/20",
        "Closed-Lost": "bg-red-500/10  text-red-400 hover:bg-red-500/20",
    };

    return [
        {
            key: "deal_title",
            header: "Title",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.deal_title}</p>
                </div>
            ),
        },
        {
            key: "amount",
            header: "Amount",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.amount}</p>
                </div>
            ),
        },
        {
            key: "discount",
            header: "Discount",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.discount}</p>
                </div>
            ),
        },
        {
            key: "tax",
            header: "Tax",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.tax}</p>
                </div>
            ),
        },
        {
            key: "total",
            header: "Total",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.total}</p>
                </div>
            ),
        },
        {
            key: "agent",
            header: "Agent",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.agent?.name}</p>
                </div>
            ),
        },
        {
            key: "Customer",
            header: "customer",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.customer?.name}</p>
                </div>
            ),
        },
        {
            key: "Status",
            header: "status",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <span
                        className={`
          px-3 py-1 rounded-full text-sm font-medium 
          ${statusColors[client.status] || "bg-gray-100 text-gray-700"}
        `}
                    >
                        {client.status}
                    </span>
                </div>
            ),
        },
        {
            key: "expected_close_date",
            header: "Expt Close Date",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client?.expected_close_date}</p>
                </div>
            ),
        },
        {
            key: "options",
            header: "Options",
            render: (item) => (
                <OptionsMenu endpoint={endpoint} pageTitle={pageTitle} item={item} onSuccess={onSuccess} />
            ),
        },
    ];
}