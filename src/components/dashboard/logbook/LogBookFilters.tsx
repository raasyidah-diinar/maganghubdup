"use client";

import { Search, Filter, Calendar, Download, Plus, ChevronDown, Landmark, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LogBookFiltersProps {
    onExport: () => void;
    onAdd: () => void;
    onShow: () => void;
    selectedIndustri: string;
    selectedProject: string;
    onIndustriChange: (val: string) => void;
    onProjectChange: (val: string) => void;
}

export default function LogBookFilters({
    onExport,
    onAdd,
    onShow,
    selectedIndustri,
    selectedProject,
    onIndustriChange,
    onProjectChange
}: LogBookFiltersProps) {
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const projectRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    const projects = ["Glints", "Tokopedia", "Gojek"];
    const filters = ["Semua Proyek", "Magang Hub", "Chamber Dashboard", "Finance Report 2024", "Logistic System"];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (projectRef.current && !projectRef.current.contains(event.target as Node)) {
                setIsProjectOpen(false);
            }
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleIndustriSelect = (val: string) => {
        onIndustriChange(val);
        setIsProjectOpen(false);
        onShow(); // Trigger load as requested
    };

    const handleProjectSelect = (val: string) => {
        onProjectChange(val);
        setIsFilterOpen(false);
        onShow(); // Trigger load as requested
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-3 flex-wrap">
            <div className="flex flex-wrap items-center gap-2">
                {/* Project Selector (Industri) */}
                <div className="relative" ref={projectRef}>
                    <div
                        onClick={() => setIsProjectOpen(!isProjectOpen)}
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm cursor-pointer select-none min-w-[120px]"
                    >
                        <div className="w-5 h-5 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <Landmark size={14} className="text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedIndustri}</span>
                        <ChevronDown size={14} className={`text-gray-400 ml-auto transition-transform ${isProjectOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isProjectOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                            {projects.map((p) => (
                                <div
                                    key={p}
                                    onClick={() => handleIndustriSelect(p)}
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Filter Dropdown (Project) */}
                <div className="relative" ref={filterRef}>
                    <div
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm cursor-pointer select-none min-w-[160px]"
                    >
                        <Filter size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{selectedProject}</span>
                        <ChevronDown size={14} className={`text-gray-400 ml-auto transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                            {filters.map((f) => (
                                <div
                                    key={f}
                                    onClick={() => handleProjectSelect(f)}
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    {f}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Selection */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                    <input
                        type="date"
                        defaultValue="2026-01-16"
                        className="text-sm text-gray-600 dark:text-gray-400 bg-transparent outline-none cursor-pointer"
                    />
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <input
                        type="date"
                        defaultValue="2026-02-15"
                        className="text-sm text-gray-600 dark:text-gray-400 bg-transparent outline-none cursor-pointer"
                    />
                </div>

                <button
                    onClick={onShow}
                    className="px-4 py-2 bg-[#E8532F] text-white rounded-lg text-sm font-bold hover:bg-[#d44726] transition-colors shadow-sm"
                >
                    Tampilkan
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#E8532F] rounded-lg text-sm font-bold text-[#E8532F] hover:bg-[#FFF5F2] transition-colors shadow-sm"
                >
                    <Download size={16} />
                    <span>Export</span>
                </button>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E8532F] text-white rounded-lg text-sm font-bold hover:bg-[#d44726] transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    <span>Laporan</span>
                </button>
            </div>
        </div>
    );
}
