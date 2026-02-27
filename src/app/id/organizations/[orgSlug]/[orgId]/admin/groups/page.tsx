"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, ArrowDownNarrowWide, Users, ChevronDown, Check, Loader2 } from "lucide-react";
import CreateGroupModal from "@/components/dashboard/groups/CreateGroupModal";

const SORT_OPTIONS = ["Paling Baru", "Paling Lama", "A - Z", "Z - A"];

export default function AdminGroupsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Paling Baru");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium tracking-wide">Memuat Grup...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-10 py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[28px] font-black text-[#1e293b] dark:text-white tracking-tight">
                    Group
                </h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white text-[14px] font-bold rounded-xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus size={16} />
                    Buat Grup
                </button>
            </div>

            {/* Search + Sort Bar */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari nama atau deskripsi grup..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-orange-300 dark:focus:border-orange-600 focus:ring-4 focus:ring-orange-50/50 transition-all shadow-sm"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] font-medium text-gray-600 dark:text-gray-300 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <ArrowDownNarrowWide size={18} className="text-gray-400" />
                        {selectedSort}
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                    </button>

                    {sortOpen && (
                        <div className="absolute left-0 top-[calc(100%+6px)] w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => { setSelectedSort(opt); setSortOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors ${selectedSort === opt
                                        ? "bg-gray-100/80 dark:bg-gray-700/80 text-gray-900 dark:text-white font-semibold"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    {opt}
                                    {selectedSort === opt && <Check size={16} className="text-gray-500 dark:text-gray-400" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Empty State */}
            <div className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[32px] bg-[#f8fafc] dark:bg-gray-800/30 flex flex-col items-center justify-center py-24 gap-6">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center">
                    <Search size={32} className="text-gray-200 dark:text-gray-600" />
                </div>
                <div className="text-center">
                    <p className="text-[18px] font-bold text-gray-700 dark:text-gray-200 mb-2">
                        Belum ada grup
                    </p>
                    <p className="text-[14px] text-gray-400 dark:text-gray-500 max-w-[300px] leading-relaxed">
                        Organisasi belum memiliki grup diskusi publik.
                    </p>
                </div>
            </div>

            <CreateGroupModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
