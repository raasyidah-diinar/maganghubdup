"use client";

import { X, ChevronLeft, Search, RotateCcw, Trash2, Check } from "lucide-react";
import { useState } from "react";

interface ArchivedItemsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRestore?: (title: string) => void;
}

export default function ArchivedItemsModal({ isOpen, onClose, onRestore }: ArchivedItemsModalProps) {
    if (!isOpen) return null;

    const [searchQuery, setSearchQuery] = useState("");

    const [archivedTasks, setArchivedTasks] = useState([
        { id: "1", title: "Old Smart Contract POC", date: "10 Dec", icon: "U", color: "bg-orange-500" },
        { id: "2", title: "Legacy PHP Auth Logic", date: "16 Nov", icon: "User", image: "/martin.png" },
        { id: "3", title: "Draft Proposal Redesign 2023", date: "15 Feb", icon: "U", color: "bg-orange-500" },
        { id: "4", title: "Deprecated API Endpoints", date: "02 Jan", icon: "M", color: "bg-blue-500" },
        { id: "5", title: "Old Landing Page Assets", date: "20 Oct", icon: "User", image: "/avatar-1.png" },
        { id: "6", title: "Q3 Marketing Materials", date: "12 Sep", icon: "Q", color: "bg-green-500" },
        { id: "7", title: "Unused CSS Cleanup", date: "05 Aug", icon: "C", color: "bg-purple-500" },
        { id: "8", title: "Old Server Configs", date: "30 Jul", icon: "S", color: "bg-gray-500" },
    ]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10 pt-5 pr-5">
                    <div className="flex items-center gap-4 text-[#1e293b] dark:text-white">
                        <button onClick={onClose} className="hover:text-gray-600 transition-colors">
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <h2 className="text-base font-bold">Archived items</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-5 pb-5 bg-white dark:bg-gray-900 border-b-2 border-slate-100 dark:border-gray-800">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all text-sm placeholder:text-gray-400 font-medium"
                        />
                    </div>
                </div>

                {/* List Content */}
                <div className="p-5 overflow-y-auto bg-slate-100 dark:bg-gray-900/50 flex-1 space-y-4 min-h-[50vh]">
                    {archivedTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex flex-col gap-1.5 p-1 mb-2"
                        >
                            {/* Main Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#00c65e] rounded-[4px] w-[20px] h-[20px] flex items-center justify-center shrink-0">
                                            <Check size={14} strokeWidth={4} className="text-white" />
                                        </div>
                                        <span className="font-bold text-[#1e293b] dark:text-white text-[15px]">{task.title}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-[#94a3b8] dark:text-gray-400 uppercase tracking-widest leading-none">{task.date}</span>
                                        {task.image ? (
                                            <div className="w-[18px] h-[18px] rounded-full overflow-hidden shrink-0">
                                                <img src={task.image} alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className={`w-[18px] h-[18px] rounded-full ${task.color} shrink-0 flex items-center justify-center text-[8px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-800`}>
                                                {task.icon}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions (Outside Card) */}
                            <div className="flex items-center gap-2.5 px-1 mt-0.5 text-[13px] font-semibold text-[#64748b] dark:text-gray-400 tracking-wide">
                                <button
                                    className="hover:text-[#1e293b] dark:hover:text-gray-200 transition-colors"
                                    onClick={() => {
                                        if (onRestore) onRestore(task.title);
                                        setArchivedTasks(prev => prev.filter(t => t.id !== task.id));
                                    }}
                                >
                                    Restore
                                </button>
                                <div className="w-[3px] h-[3px] rounded-full bg-[#cbd5e1] dark:bg-gray-600"></div>
                                <button className="hover:text-[#1e293b] dark:hover:text-gray-200 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
