"use client";

import { Check, ClipboardList, Loader2 } from "lucide-react";

export interface LogEntry {
    id: string;
    tglLaporan: string;
    periode: string;
    proyek: string;
    uraian: string;
    industri: boolean;
    pendidikan: boolean;
    industryName?: string;
    tasks?: string[];
    attachments?: { name: string; url: string }[];
}

interface LogBookTableProps {
    data: LogEntry[];
    isLoading?: boolean;
    onShowDetail?: (entry: LogEntry) => void;
}

export default function LogBookTable({ data, isLoading, onShowDetail }: LogBookTableProps) {
    return (
        <div className="relative group min-h-[400px]">
            {/* Loading Overlay within Table Area */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-[1px] rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-10 h-10 text-[#E8532F] animate-spin" />
                        <span className="text-xs font-bold text-gray-500">Memuat Data...</span>
                    </div>
                </div>
            )}

            {data.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 py-24 px-4 shadow-sm h-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-500">
                            <ClipboardList size={32} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Tidak ada laporan ditemukan dalam rentang ini.
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Cobalah untuk memilih industri atau rentang waktu yang berbeda.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-700">
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200">Tgl Laporan</th>
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200">Periode</th>
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200">Proyek</th>
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 w-[40%]">Uraian</th>
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">Industri</th>
                                <th className="px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">Pendidikan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {data.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onShowDetail?.(row)}
                                    className="hover:bg-gray-50/30 dark:hover:bg-gray-700/20 transition-colors cursor-pointer"
                                >
                                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{row.tglLaporan}</td>
                                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{row.periode}</td>
                                    <td className="px-5 py-3 text-sm font-bold text-gray-900 dark:text-white">{row.proyek}</td>
                                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400 truncate max-w-[400px]" title={row.uraian}>{row.uraian}</td>
                                    <td className="px-5 py-3 text-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto border ${row.industri
                                            ? "bg-white border-emerald-500 text-emerald-500"
                                            : "bg-white border-gray-200 text-gray-200"
                                            }`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto border ${row.pendidikan
                                            ? "bg-white border-emerald-500 text-emerald-500"
                                            : "bg-white border-gray-200 text-gray-200"
                                            }`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
