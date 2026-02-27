"use client";

import { Search, Filter, Calendar, Download, Plus, ChevronDown, Landmark, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LogBookFiltersProps {
    onExport: () => void;
    onAdd: () => void;
    onShow: () => void;
    selectedIndustri: string;
    selectedProject: string;
    onIndustriChange: (val: string) => void;
    onProjectChange: (val: string) => void;
    startDate: Date;
    endDate: Date;
    onDateRangeChange: (start: Date, end: Date) => void;
}

export default function LogBookFilters({
    onExport,
    onAdd,
    onShow,
    selectedIndustri,
    selectedProject,
    onIndustriChange,
    onProjectChange,
    startDate,
    endDate,
    onDateRangeChange
}: LogBookFiltersProps) {
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); // February 2026 as per screenshot

    const projectRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

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
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleIndustriSelect = (val: string) => {
        onIndustriChange(val);
        setIsProjectOpen(false);
        onShow();
    };

    const handleProjectSelect = (val: string) => {
        onProjectChange(val);
        setIsFilterOpen(false);
        onShow();
    };

    const formatDate = (date: Date) => {
        const d = date.getDate();
        const m = date.toLocaleString('default', { month: 'short' });
        const y = date.getFullYear();
        return `${d} ${m} ${y}`;
    };

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const generateCalendarDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const days = [];
        const totalDays = daysInMonth(year, month);
        const startOffset = firstDayOfMonth(year, month);

        // Previous month days offset
        for (let i = 0; i < startOffset; i++) {
            days.push(null);
        }

        for (let i = 1; i <= totalDays; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const handleDateClick = (date: Date) => {
        // Toggle logic: If clicking a date that would make a valid range, set it as end
        // Otherwise, reset start to the new date
        if (date > startDate && endDate.getTime() === startDate.getTime()) {
            onDateRangeChange(startDate, date);
            setIsCalendarOpen(false); // Close when range is complete
        } else {
            onDateRangeChange(date, date); // Start new selection
        }
    };

    const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));

    return (
        <div className="flex items-center gap-2">
            {/* Project Selector (Industri) */}
            <div className="relative" ref={projectRef}>
                <div
                    onClick={() => setIsProjectOpen(!isProjectOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm cursor-pointer select-none h-[38px]"
                >
                    <Landmark size={14} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedIndustri}</span>
                    <ChevronDown size={14} className={`text-gray-400 ml-4 transition-transform ${isProjectOpen ? 'rotate-180' : ''}`} />
                </div>

                {isProjectOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                        {projects.map((p) => (
                            <div
                                key={p}
                                onClick={() => handleIndustriSelect(p)}
                                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
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
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm cursor-pointer select-none h-[38px]"
                >
                    <Filter size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{selectedProject}</span>
                    <ChevronDown size={14} className={`text-gray-400 ml-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </div>

                {isFilterOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                        {filters.map((f) => (
                            <div
                                key={f}
                                onClick={() => handleProjectSelect(f)}
                                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                            >
                                {f}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Date Selection */}
            <div className="relative" ref={calendarRef}>
                <div
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="flex items-center gap-3 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm cursor-pointer h-[38px]"
                >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(startDate)}</span>
                    <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(endDate)}</span>
                </div>

                {isCalendarOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[60] p-4 scale-in-center">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <span className="font-bold text-gray-800 dark:text-white text-sm">
                                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </span>
                            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                                <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">
                                    {day}
                                </div>
                            ))}
                            {generateCalendarDays().map((date, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => date && handleDateClick(date)}
                                    className={`
                                        h-9 w-9 flex items-center justify-center text-xs rounded-lg cursor-pointer transition-all
                                        ${!date ? 'pointer-events-none' : ''}
                                        ${date && (date.toDateString() === startDate.toDateString() || date.toDateString() === endDate.toDateString()) ? 'bg-blue-50 text-blue-600 font-bold' : ''}
                                        ${date && date > startDate && date < endDate ? 'bg-blue-50/50 text-blue-600' : ''}
                                        ${date ? 'hover:bg-gray-50 text-gray-700 dark:text-gray-300' : ''}
                                    `}
                                >
                                    {date ? date.getDate() : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={onShow}
                className="px-4 py-2 bg-[#E8532F] text-white rounded-lg text-sm font-bold hover:bg-[#d44726] transition-all shadow-sm active:scale-95 h-[38px]"
            >
                Tampilkan
            </button>

            <button
                onClick={onExport}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#E8532F] rounded-lg text-sm font-bold text-[#E8532F] hover:bg-[#FFF5F2] transition-colors shadow-sm h-[38px]"
            >
                <Download size={16} />
                <span>Export</span>
            </button>

            <button
                onClick={onAdd}
                className="flex items-center gap-2 px-4 py-2 bg-[#E8532F] text-white rounded-lg text-sm font-bold hover:bg-[#d44726] transition-colors shadow-sm h-[38px]"
            >
                <Plus size={16} />
                <span>Laporan</span>
            </button>
        </div>
    );
}
