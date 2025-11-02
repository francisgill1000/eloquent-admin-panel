"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
    FileText,
    FileSignature,
    Receipt,
    ShoppingCart,
    MessageSquare,
    MapPin,
    Building,
    BarChart2,
    Bell,
    Calendar,
    Search,
} from "lucide-react";

// Default apps data
const defaultApps = [
    { name: "Invoice", description: "Create and send invoices easily", icon: <Receipt size={28} className="text-accent" />, link: "/apps/invoice" },
    { name: "Sales", description: "Track and manage your sales pipeline", icon: <ShoppingCart size={28} className="text-accent" />, link: "/apps/sales" },
    { name: "Proposal", description: "Prepare and manage client proposals", icon: <FileSignature size={28} className="text-accent" />, link: "/apps/proposal" },
    { name: "Whatsapp Chat", description: "Communicate with team members", icon: <MessageSquare size={28} className="text-accent" />, link: "/apps/chat" },
    { name: "Analytics", description: "View detailed performance metrics", icon: <BarChart2 size={28} className="text-accent" />, link: "/apps/analytics" },
    { name: "Map Tracker", description: "Track employee and asset locations", icon: <MapPin size={28} className="text-accent" />, link: "/apps/map-tracker" },
    { name: "Real Estate Management", description: "Manage listings, leads, and clients", icon: <Building size={28} className="text-accent" />, link: "/apps/real-estate" },
    { name: "Notifications Center", description: "Manage all system alerts and updates", icon: <Bell size={28} className="text-accent" />, link: "/apps/notifications" },
    { name: "Booking", description: "Manage and schedule appointments or reservations", icon: <Calendar size={28} className="text-accent" />, link: "/apps/booking" },
];

export default function DefaultApp() {
    const [apps, setApps] = useState([]);
    const [search, setSearch] = useState("");

    // Load apps order from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("appsOrder");
        if (saved) {
            const savedApps = JSON.parse(saved);
            // Make sure all apps exist (for first load of new apps)
            const orderedApps = savedApps
                .map((name) => defaultApps.find((app) => app.name === name))
                .filter(Boolean);
            // Add any new apps not in localStorage
            const newApps = defaultApps.filter(
                (app) => !orderedApps.find((a) => a.name === app.name)
            );
            setApps([...orderedApps, ...newApps]);
        } else {
            setApps(defaultApps);
        }
    }, []);

    const filteredApps = apps.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(apps);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setApps(items);
        // Save new order to localStorage
        localStorage.setItem(
            "appsOrder",
            JSON.stringify(items.map((app) => app.name))
        );
    };

    return (
        <div className="p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-2xl font-semibold text-foreground">Applications</h2>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-muted text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Apps Grid with DragDropContext */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="apps">
                    {(provided) => (
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {filteredApps.map((app, index) => (
                                <Draggable key={app.name} draggableId={app.name} index={index}>
                                    {(provided) => (
                                        <Link
                                            href={app.link}
                                            className="group border border-gray-200 rounded-2xl p-5 hover:bg-accent/10 hover:shadow-lg transition-all duration-200"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-accent/10 group-hover:scale-105 transition-transform">
                                                    {app.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-foreground">{app.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {filteredApps.length === 0 && (
                <p className="text-gray-500 col-span-full text-center py-10">No apps found.</p>
            )}
        </div>
    );
}
