"use client";

import { useState } from "react";
import { Search, Mail, Box, RotateCw, MoreVertical, Archive } from "lucide-react";

export default function InboxPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const filters = ["Semua", "Belum Dibaca", "Arsip"];

    return (
        <div className="flex h-full -ml-4 lg:-ml-6 -mt-4 lg:-mt-6 bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden divide-x divide-gray-100 dark:divide-gray-800">
            {/* Left Column: Message List Section */}
            <div className="w-[480px] flex flex-col bg-white dark:bg-gray-800 shrink-0">
                {/* Header & Filters */}
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-[22px] font-bold text-[#001D35] dark:text-white tracking-tight">Email</h1>
                        <div className="flex bg-[#F1F3F4] dark:bg-gray-700/50 p-1 rounded-xl">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${activeFilter === filter
                                        ? "bg-white dark:bg-gray-600 text-[#001D35] dark:text-white shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar - Inlined */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Cari email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[#F1F3F4] dark:bg-gray-700/50 border-none rounded-xl text-[13px] focus:outline-none transition-all font-medium placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Message List Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar border-t border-gray-50 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-center h-full p-10 opacity-30 grayscale mt-[-20%]">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <Box size={24} className="text-gray-400" />
                        </div>
                        <p className="text-[13px] font-medium text-gray-500">Tidak ada pesan di kategori ini.</p>
                    </div>
                </div>
            </div>

            {/* Right Column: Message Preview Section */}
            <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center p-10 relative">
                <div className="absolute top-6 right-8 flex items-center gap-2 opacity-20">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400">
                        <RotateCw size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="flex flex-col items-center max-w-sm animate-in fade-in zoom-in duration-700">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[28px] flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <Mail size={36} className="text-gray-200 dark:text-gray-700" />
                    </div>
                    <p className="text-[14px] font-semibold text-gray-300 dark:text-gray-600 tracking-tight">
                        Pilih pesan untuk ditampilkan
                    </p>
                </div>
            </div>
        </div>
    );
}
