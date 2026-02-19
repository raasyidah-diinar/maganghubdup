"use client";

import { Calendar, Clock } from "lucide-react";

interface AgendaCardProps {
    type: string;
    title: string;
    company: string;
    dateTime: string;
    onAction?: () => void;
}

export default function AgendaCard({
    type = "INTERVIEW USER",
    title = "UI/UX Designer",
    company = "Gojek",
    dateTime = "Rabu, 10:00 WIB",
    onAction
}: AgendaCardProps) {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-orange-400" />
                <h3 className="text-lg font-bold">Agenda Terdekat</h3>
            </div>

            {/* Type Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full text-xs font-semibold text-orange-400 mb-4">
                {type}
            </div>

            {/* Event Details */}
            <div className="mb-4">
                <h4 className="text-xl font-bold mb-1">
                    {company} - {title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={14} />
                    <span>{dateTime}</span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={onAction}
                className="w-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
                Persiapan
            </button>
        </div>
    );
}
