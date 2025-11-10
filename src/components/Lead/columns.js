// columns.js
"use client";


import { useState } from "react";
import { Clock, MoreVertical, PenBox, Trash2 } from "lucide-react";

import { parseApiError } from "@/lib/utils";

import Edit from "./Edit";
import Followups from "./Followups";


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
                <div className="absolute mt-2 w-24 bg-primary text-whtie border shadow-lg z-10">
                    <button
                        onClick={() => setOpenEdit("followups")}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <Clock size={14} /> Folloups
                    </button>
                    <button
                        onClick={() => setOpenEdit("edit")}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <PenBox size={14} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            )}

            {/* 👇 Edit Dialog Integration */}
            {openEdit === "followups" && (
                <Followups
                    endpoint={endpoint}
                    pageTitle={pageTitle}
                    initialData={item.activities}
                    controlledOpen={true}
                    controlledSetOpen={(val) => setOpenEdit(val ? "followups" : false)}
                    onSuccess={handleSuccess}
                />
            )}

            {openEdit === "edit" && (
                <Edit
                    endpoint={endpoint}
                    pageTitle={pageTitle}
                    initialData={item}
                    controlledOpen={true}
                    controlledSetOpen={(val) => setOpenEdit(val ? "edit" : false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}

export default function Columns({ endpoint, pageTitle, onSuccess = (e) => { e } } = {}) {
    return [
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
            key: "Source",
            header: "source",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.source}</p>
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
                    <p className="font-medium">{client.status}</p>
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