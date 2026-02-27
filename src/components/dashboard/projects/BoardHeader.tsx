"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, LayoutGrid, List, ChevronDown, Check } from "lucide-react";
import ProjectOptions from "./ProjectOptions";

interface BoardHeaderProps {
    title: string;
    onAddTask: () => void;
    onShare: () => void;
    viewMode: "board" | "list";
    onChangeView: (mode: "board" | "list") => void;
    onOpenArchive: () => void;
    onOpenAbout: () => void;
}

export default function BoardHeader({ title, onAddTask, onShare, viewMode, onChangeView, onOpenArchive, onOpenAbout }: BoardHeaderProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

    return (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white shrink-0">{title}</h1>

                <div className="relative group">
                    <button
                        onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                        className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {viewMode === "board" ? <LayoutGrid size={16} className="text-orange-500" /> : <List size={16} className="text-orange-500" />}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isViewDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsViewDropdownOpen(false)}></div>
                            <div className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => {
                                        onChangeView("board");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid size={14} />
                                        <span>Board</span>
                                    </div>
                                    {viewMode === "board" && <Check size={14} className="text-orange-500" />}
                                </button>
                                <button
                                    onClick={() => {
                                        onChangeView("list");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center gap-2">
                                        <List size={14} />
                                        <span>List</span>
                                    </div>
                                    {viewMode === "list" && <Check size={14} className="text-orange-500" />}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Search Bar - Moved next to toggle */}
                <div className="relative hidden md:block w-64 ml-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Cari tugas..."
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button
                    onClick={onShare}
                    className="flex items-center gap-2 bg-[#E8532F] hover:bg-[#d64522] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md shadow-orange-500/20 transition-all"
                >
                    <Plus size={16} strokeWidth={3} />
                    <span>Share</span>
                </button>

                {/* Search for mobile */}
                <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <Search size={20} />
                </button>

                <div className="relative z-50">
                    <button
                        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        className={`p-2 border rounded-lg transition-colors ${isOptionsOpen
                            ? "bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                    >
                        <MoreHorizontal size={20} />
                    </button>
                    <ProjectOptions
                        isOpen={isOptionsOpen}
                        onClose={() => setIsOptionsOpen(false)}
                        onOpenArchive={onOpenArchive}
                        onOpenAbout={onOpenAbout}
                    />
                </div>
            </div>
        </div>
    );
}