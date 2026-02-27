"use client";

import { useState } from "react";
import { Search, Plus, Briefcase, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const TABS = ["Semua", "Aktif", "Nonaktif", "Dalam Review", "Draft"];

export default function IndustryJobsPage() {
    const params = useParams();
    const orgSlug = params.orgSlug;
    const orgId = params.orgId;
    const [activeTab, setActiveTab] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const createJobUrl = `/id/organizations/${orgSlug}/${orgId}/industri/jobs/tambah`;

    return (
        <div className="space-y-6 pb-10 animate-slide-up">
            {/* Header Controls */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Cari judul lowongan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                </div>

                <Link href={createJobUrl}>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                        <Plus size={18} />
                        Buat Lowongan
                    </button>
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-8">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab
                                    ? "text-[#E8532F]"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8532F] rounded-full animate-in fade-in slide-in-from-bottom-1" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty State */}
            <div className="w-full py-20 bg-white dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-[32px] flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-700">
                    <Briefcase size={32} className="text-gray-200 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Tidak ada lowongan
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed">
                    Mulai dengan membuat lowongan baru untuk mencari kandidat terbaik.
                </p>
            </div>
        </div>
    );
}
