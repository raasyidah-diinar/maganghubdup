"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import ProjectOptions from "./ProjectOptions";

interface BoardHeaderProps {
    title: string;
    onAddTask: () => void;
    viewMode: "board" | "list";
    onChangeView: (mode: "board" | "list") => void;
    onOpenArchive: () => void;
}

export default function BoardHeader({ title, onAddTask, viewMode, onChangeView, onOpenArchive }: BoardHeaderProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>

                <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <button
                        onClick={() => onChangeView("board")}
                        className={`p-1.5 rounded ${viewMode === "board" ? "bg-white dark:bg-gray-700 text-orange-500 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => onChangeView("list")}
                        className={`p-1.5 rounded ${viewMode === "list" ? "bg-white dark:bg-gray-700 text-orange-500 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Cari tugas..."
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                </div>

                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 bg-[#E8532F] hover:bg-[#d64522] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md shadow-orange-500/20 transition-all uppercase"
                >
                    <Plus size={16} strokeWidth={3} />
                    <span>Tugas</span>
                </button>

                {/* PERBAIKAN: ProjectOptions dipindahkan keluar dari button */}
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
                    {/* ProjectOptions sekarang di luar button */}
                    <ProjectOptions
                        isOpen={isOptionsOpen}
                        onClose={() => setIsOptionsOpen(false)}
                        onOpenArchive={onOpenArchive}
                    />
                </div>
            </div>
        </div>
    );
}