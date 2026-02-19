"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface LogBookPaginationProps {
    currentPage: number;
    totalItems: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
}

export default function LogBookPagination({
    currentPage,
    totalItems,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: LogBookPaginationProps) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const endItem = Math.min(currentPage * rowsPerPage, totalItems);

    const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onRowsPerPageChange(Number(e.target.value));
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === i
                            ? "bg-[#E8532F] text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 min-w-[140px]">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Menampilkan</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{startItem}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{endItem}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">dari</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{totalItems}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">data</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Baris:</span>
                    <div className="relative">
                        <select
                            value={rowsPerPage}
                            onChange={handleRowsChange}
                            className="appearance-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg pl-3 pr-8 py-1.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer shadow-sm min-w-[70px]"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                    <ChevronLeft size={16} />
                </button>

                {renderPageButtons()}

                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
