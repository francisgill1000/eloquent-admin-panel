// columns.js
"use client";


import { useState } from "react";
import { MoreVertical, PenBox, Trash2 } from "lucide-react";

import { parseApiError } from "@/lib/utils";

import Edit from "./Edit";

function OptionsMenu({ admin, pageTitle, onSuccess = (e) => { e } }) {
    const [openEdit, setOpenEdit] = useState(false);

    const onDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return; // exit if user cancels
        try {
            await axios.delete(`customers/${admin.id}`);

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

export default function Columns({ pageTitle, onSuccess = (e) => { e } } = {}) {
    return [
        {
            key: "client",
            header: "Name",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <img
                        alt={client.name}
                        className="w-8 h-8 rounded-full object-cover shadow-sm"
                        src={
                            client.profile_picture ||
                            `https://placehold.co/40x40/0f0f0f/00ffcc?text=${client.name.charAt(0)}`
                        }

                    />
                    <div>
                        <p className="font-medium">{client.name}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "client",
            header: "Whatsapp",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.whatsapp}</p>
                </div>
            ),
        },
        {
            key: "client",
            header: "Phone",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.phone}</p>
                </div>
            ),
        },
        {
            key: "client",
            header: "Email",
            render: (client) => (
                <div
                    onClick={() => handleRowClick(client.id)}
                    className="flex items-center space-x-3 cursor-pointer"
                >
                    <p className="font-medium">{client.email}</p>
                </div>
            ),
        },
        {
            key: "city",
            header: "City",
            render: (client) => {
                const city = client.city || "-";
                const country = client.country || "-";

                // If both are "-", just show "-"
                const displayText = city === "-" && country === "-" ? "-" : `${city}${country !== "-" ? `, ${country}` : ""}`;

                return (
                    <div
                        role="button"
                        onClick={() => handleRowClick(client.id)}
                        className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors ${displayText === "-" ? "cursor-default hover:bg-transparent" : ""}`}
                        title={displayText !== "-" ? displayText : undefined}
                    >
                        <p className="font-medium truncate">{displayText?.split("_")[1] || "-"}</p>
                    </div>
                );
            },
        },
        {
            key: "options",
            header: "Options",
            render: (admin) => (
                <OptionsMenu pageTitle={pageTitle} admin={admin} onSuccess={onSuccess} />
            ),
        },
    ];
}