"use client";

import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axios";

if (typeof window !== "undefined" && !window.axios) {
    window.axios = axiosInstance;
}


export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");


        if (!storedUser || !token || token == 'undefined ') {
            return router.push("/login");
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Hide header on auth routes
    if (
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/signup") ||
        pathname?.startsWith("/forgot-password")
    ) {
        return null;
    }
    // Logout function
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return router.push("/login");

            await axiosInstance.post(`logout`);

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("authChange"));

            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    return (
        <header className="top-0 bg-[#1b1b1b] flex items-center justify-between py-2 px-6 shadow-md border-b border-[#00ffcc1a] mb-6">
            <div className='flex'>
                <h1 className="text-xl font-bold text-[#00ffcc]"> Analytics Overview</h1>
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-[#0f0f0f] text-white p-2 rounded-lg outline-none border border-[#00ffcc1a] focus:border-[#00ffcc] w-48 md:w-64"
                />
                <div className="relative w-10 h-10 flex items-center justify-center bg-[#0f0f0f] border border-[#00ffcc1a] rounded-full cursor-pointer hover:border-[#00ffcc] transition">
                    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <User size={20} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-32 bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                        >
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100"
                            >
                                <LogOut size={16} /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>


    );
}
