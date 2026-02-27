"use client";

import { Loader2 } from "lucide-react";

export interface GradingEntry {
    id: string;
    tglPenilaian: string;
    memberName: string;
    memberAvatar: string;
    kategori: string;
    penilai: string;
    deskripsi: string;
    nilai: number;
}

interface GradingTableProps {
    data: GradingEntry[];
    isLoading: boolean;
}

export default function GradingTable({ data, isLoading }: GradingTableProps) {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-20 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Memuat data penilaian...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Tgl Penilaian</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Anggota</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Kategori</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Penilai</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Deskripsi</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-32 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-sm font-medium">Data tidak ditemukan.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4 text-[13px] font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                        {item.tglPenilaian}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img src={item.memberAvatar} alt={item.memberName} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900 dark:text-white uppercase tracking-tight">{item.memberName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded-lg">
                                            {item.kategori}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-semibold text-gray-700 dark:text-gray-200">
                                        {item.penilai}
                                    </td>
                                    <td className="px-6 py-4 max-w-[300px]">
                                        <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                                            {item.deskripsi}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[14px] font-black text-gray-900 dark:text-white">{item.nilai}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
