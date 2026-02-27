"use client";

import React from "react";
import { Trophy } from "lucide-react";

interface CompanyRiwayatProps {
    pengajuan?: number;
    magang?: number;
    alumni?: number;
}

export default function CompanyRiwayat({
    pengajuan = 300,
    magang = 15,
    alumni = 120,
}: CompanyRiwayatProps) {
    const stats = [
        { label: "PENGAJUAN", value: pengajuan, bgColor: "bg-blue-50/70", textColor: "text-blue-600" },
        { label: "MAGANG", value: magang, bgColor: "bg-green-50/70", textColor: "text-green-600" },
        { label: "ALUMNI", value: alumni, bgColor: "bg-gray-100", textColor: "text-gray-800" },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
                <Trophy size={24} className="text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Riwayat</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`${stat.bgColor} dark:bg-gray-900/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1`}>
                        <span className={`text-2xl font-bold ${stat.textColor} dark:text-white`}>{stat.value}</span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
