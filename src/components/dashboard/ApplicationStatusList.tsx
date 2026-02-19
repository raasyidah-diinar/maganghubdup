"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";

interface Application {
    id: string;
    company: string;
    position: string;
    daysAgo: number;
    status: "INTERVIEW" | "REVIEW" | "DIKIRIM";
}

interface ApplicationStatusListProps {
    applications: Application[];
}

export default function ApplicationStatusList({ applications }: ApplicationStatusListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "INTERVIEW":
                return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
            case "REVIEW":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
            case "DIKIRIM":
                return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400";
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400";
        }
    };

    const getCompanyInitial = (company: string) => {
        return company.charAt(0).toUpperCase();
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Status Pengajuan Terakhir
                </h3>
                <Link
                    href="/id/dashboard/applications"
                    className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline"
                >
                    Semua
                </Link>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        {/* Company Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm flex-shrink-0">
                            {getCompanyInitial(app.company)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {app.position}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {app.company} • {app.daysAgo} Des
                            </p>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                            {app.status}
                        </span>

                        {/* More Options */}
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
