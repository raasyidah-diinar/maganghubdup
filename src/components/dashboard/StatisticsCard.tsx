"use client";

import { ReactNode } from "react";
import { AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

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
    const statusColors = {
        warning: "text-red-600 dark:text-red-400",
        info: "text-blue-600 dark:text-blue-400",
        success: "text-green-600 dark:text-green-400",
    };

    const statusIcons = {
        warning: <AlertTriangle size={14} />,
        info: <TrendingUp size={14} />,
        success: <CheckCircle size={14} />,
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`${iconBgColor} p-3 rounded-lg text-orange-600 dark:text-orange-400`}>
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
            <div className={`flex items-center gap-1.5 text-xs font-medium ${statusColors[status.type]}`}>
                {statusIcons[status.type]}
                <span>{status.text}</span>
            </div>
        </div>
    );
}
