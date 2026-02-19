"use client";

import { X, ChevronLeft, Search, RotateCcw, Trash2, CheckSquare } from "lucide-react";
import { useState } from "react";

interface ArchivedItemsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ArchivedItemsModal({ isOpen, onClose }: ArchivedItemsModalProps) {
    if (!isOpen) return null;

    const [searchQuery, setSearchQuery] = useState("");

    const archivedTasks = [
        { id: "1", title: "Old Smart Contract POC", date: "10 Dec", icon: "U", color: "bg-orange-500" },
        { id: "2", title: "Legacy PHP Auth Logic", date: "16 Nov", icon: "User", image: "/martin.png" },
        { id: "3", title: "Draft Proposal Redesign 2023", date: "15 Feb", icon: "U", color: "bg-orange-500" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Archived items</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-800 dark:border-orange-500/50 dark:text-white transition-all"
                        />
                    </div>
                </div>

                {/* List Content */}
                <div className="p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 flex-1 space-y-4">
                    {archivedTasks.map((task) => (
                        <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 rounded p-0.5">
                                        <CheckSquare size={16} className="text-white" />
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-white text-base">{task.title}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{task.date}</span>
                                {task.image ? (
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                                        <img src={task.image} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className={`w-6 h-6 rounded-full ${task.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm border border-white dark:border-gray-800`}>
                                        {task.icon}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700/50 flex items-center gap-4 text-sm font-semibold">
                                <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    Restore
                                </button>
                                <span className="text-gray-300">•</span>
                                <button className="text-gray-500 hover:text-red-500 transition-colors">
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
