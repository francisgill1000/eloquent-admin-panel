"use client";

import { User } from "lucide-react";

const Header = () => {

    return <header className="top-0 bg-[#1b1b1b] flex items-center justify-between py-2 px-6 shadow-md border-b border-[#00ffcc1a] mb-6">
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
                <User size={20} />
            </div>
        </div>
    </header>
}


export default Header;