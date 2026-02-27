"use client";

import { ReactNode } from "react";
import { Zap } from "lucide-react";

interface StatisticsCardProps {
    icon: ReactNode;
    value: number;
    label: string;
    status: {
        text: string;
        type: "warning" | "info" | "success";
    };
    iconBgColor?: string;
}

export default function StatisticsCard({
    icon,
    value,
    label,
    status,
    iconBgColor = "bg-orange-100 dark:bg-orange-900/30"
}: StatisticsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`${iconBgColor} flex items-center justify-center`}>
                    {icon}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">
                    Statistik
                </span>
            </div>

            {/* Value */}
            <div className="mb-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {value}
                </h3>
            </div>

            {/* Label */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {label}
            </p>

            {/* Status */}
            <div className="mt-3 text-[10px] text-[#F04E30] font-bold flex items-center gap-1">
                <Zap size={12} fill="currentColor" />
                <span>{status.text}</span>
            </div>
        </div>
    );
}
