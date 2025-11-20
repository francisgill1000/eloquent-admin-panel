// columns.js
"use client";


import { useState } from "react";
import { MoreVertical, PenBox, Trash2 } from "lucide-react";

import { parseApiError } from "@/lib/utils";

import Edit from "./Edit";

function OptionsMenu({ endpoint, admin, pageTitle, onSuccess = (e) => { e } }) {
    const [openEdit, setOpenEdit] = useState(false);

    const onDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return; // exit if user cancels
        try {
            await axios.delete(`${endpoint}/${admin.id}`);

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
                        onClick={() => setOpenEdit("edit")}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <PenBox size={14} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(admin.id)}
                        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            )}

            {/* 👇 Edit Dialog Integration */}
            {openEdit === "edit" && (
                <Edit
                    endpoint={endpoint}
                    pageTitle={pageTitle}
                    initialData={admin}
                    controlledOpen={true}
                    controlledSetOpen={(val) => setOpenEdit(val ? "edit" : false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}

export default function Columns({ endpoint, pageTitle, onSuccess = (e) => { e } } = {}) {

    const statusColors = {
        "Pending": "bg-green-500/10 border text-green-400 hover:bg-green-500/20 animate-pulse-slow",
        Hold: "bg-blue-500/10  text-blue-400 hover:bg-blue-500/20",
        Done: "bg-yellow-500/10  text-yellow-400 hover:bg-yellow-500/20",
        "Cancelled": "bg-gray-500/10  text-gray-100 hover:bg-green-500/20",
    };

    return [
        {
            key: "title",
            header: "Title",
        },
        {
            key: "description",
            header: "description",
        },
        {
            key: "due_date",
            header: "due_date",
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
            key: "options",
            header: "Options",
            render: (admin) => (
                <OptionsMenu endpoint={endpoint} pageTitle={pageTitle} admin={admin} onSuccess={onSuccess} />
            ),
        },
    ];
}