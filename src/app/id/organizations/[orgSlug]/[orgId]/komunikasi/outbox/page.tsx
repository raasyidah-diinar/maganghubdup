"use client";

import { useState } from "react";
import { Search, Archive, Box, RotateCw, MoreVertical, CheckSquare } from "lucide-react";
import CommunicationSidebar from "@/components/komunikasi/CommunicationSidebar";
import ComposeFlow from "@/components/komunikasi/ComposeFlow";
import { useRouter } from "next/navigation";

export default function OutboxPage() {
    const [isComposing, setIsComposing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleTabChange = (tabId: string) => {
        if (tabId === "inbox") {
            router.push("./inbox");
        }
    };

    if (isComposing) {
        return (
            <div className="h-full bg-white dark:bg-gray-900 overflow-y-auto custom-scrollbar">
                <ComposeFlow onBack={() => setIsComposing(false)} />
            </div>
        );
    }

    return (
        <div className="flex h-full -ml-4 lg:-ml-6 -mt-4 lg:-mt-6 bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden">
            {/* Communication Sidebar Card - Attached to the left */}
            <div className="w-[300px] bg-white dark:bg-gray-800 p-5 pt-8 border-r border-gray-100 dark:border-gray-700 h-full flex flex-col shrink-0 shadow-sm transition-all">
                <CommunicationSidebar
                    activeTab="outbox"
                    onTabChange={handleTabChange}
                    onCompose={() => setIsComposing(true)}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden px-10 py-8 gap-8">
                {/* Search Row - Fully separate from the card below */}
                <div className="flex items-center gap-6 shrink-0">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#041E49] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Telusuri email terkirim"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-4 bg-[#EEF3F8] dark:bg-gray-800/80 border-none rounded-full text-[15px] focus:outline-none transition-all font-medium placeholder-gray-500 shadow-sm"
                        />
                    </div>

                    {/* ME Avatar - Horizontally aligned with search bar */}
                    <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[13px] ring-4 ring-white shadow-md shrink-0">
                        ME
                    </div>
                </div>

                {/* Content Card Identity */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-50 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="px-8 py-4 border-b border-gray-50 dark:border-gray-700 flex items-center gap-6 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-500 transition-colors">
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-[3px]"></div>
                            </button>
                            <button className="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-500 transition-colors">
                                <RotateCw size={19} />
                            </button>
                            <button className="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-500 transition-colors">
                                <MoreVertical size={19} />
                            </button>
                        </div>
                    </div>

                    {/* Empty State */}
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center -mt-10">
                        <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 max-w-xs">
                            Tidak ada email terkirim.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
