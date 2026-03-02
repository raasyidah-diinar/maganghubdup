"use client";

import { useState } from "react";
import { Search, Mail, Box, RotateCw, MoreVertical } from "lucide-react";

export default function InboxPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const filters = ["Semua", "Belum Dibaca", "Arsip"];

    return (
        <div className="flex h-full -ml-4 lg:-ml-6 -mt-4 lg:-mt-6 bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden divide-x divide-gray-100 dark:divide-gray-800">
            {/* Left Column: Message List Section */}
            <div className="w-[450px] flex flex-col bg-white dark:bg-gray-900 shrink-0 border-r border-gray-100 dark:border-gray-800">
                {/* Header & Filters */}
                <div className="p-7 pb-5">
                    <div className="flex flex-col gap-5 mb-6">
                        <h1 className="text-[20px] font-bold text-[#001D35] dark:text-white tracking-tight">Surat Masuk</h1>

                        {/* Filter Pill Container */}
                        <div className="flex bg-[#F1F4F7] dark:bg-gray-800/80 p-1 rounded-xl w-full">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex-1 px-4 py-1.5 rounded-lg text-[12px] transition-all duration-300 ${activeFilter === filter
                                        ? "bg-white dark:bg-gray-700 text-[#001D35] dark:text-white font-semibold shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]"
                                        : "text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Cari email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700/50 focus:border-gray-200 dark:focus:border-gray-700 transition-all font-medium placeholder-gray-400 shadow-sm"
                        />
                    </div>
                </div>

                {/* Message List Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar border-t border-gray-50 dark:border-gray-800">
                    {/* Empty placeholder removed */}
                </div>
            </div>

            {/* Right Column: Message Preview Section */}
            <div className="flex-1 bg-[#D1D9E4]/30 dark:bg-gray-900/40 flex flex-col items-center justify-center text-center p-10 relative overflow-hidden">
                {/* Decorative Overlay (Simplified version of mesh/mask) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

                <div className="absolute top-6 right-8 flex items-center gap-2 opacity-30">
                    <button className="p-2.5 hover:bg-white/50 dark:hover:bg-gray-800 rounded-xl text-gray-500 transition-colors">
                        <RotateCw size={18} />
                    </button>
                    <button className="p-2.5 hover:bg-white/50 dark:hover:bg-gray-800 rounded-xl text-gray-500 transition-colors">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="flex flex-col items-center max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="mb-8">
                        <Mail size={56} className="text-[#001D35]/10 dark:text-white/10" strokeWidth={1} />
                    </div>
                    <p className="text-[15px] font-bold text-[#001D35]/30 dark:text-white/30 tracking-tight">
                        Pilih pesan untuk dibaca
                    </p>
                </div>
            </div>
        </div>
    );
}
