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
    dateTime = "Besok, 10:00 WIB",
    onAction
}: AgendaCardProps) {
    return (
        <div className="bg-white dark:bg-[#101828] rounded-[24px] p-6 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-[#F97316]" />
                <h3 className="text-lg font-bold text-[#F97316]">Agenda Terdekat</h3>
            </div>

            {/* Inner Card */}
            <div className="bg-gray-50 dark:bg-[#1A2232]/80 rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-inner">
                {/* Type */}
                <div className="text-[#F97316] text-[11px] font-bold uppercase tracking-wider mb-2">
                    {type}
                </div>

                {/* Event Details */}
                <h4 className="text-gray-900 dark:text-white text-[17px] font-bold mb-4">
                    {company} - {title}
                </h4>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
                    <Clock size={16} />
                    <span>{dateTime}</span>
                </div>

                {/* Action Button */}
                <button
                    onClick={onAction}
                    className="w-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white font-bold py-2 rounded-xl hover:opacity-90 transition-all shadow-md text-[13px]"
                >
                    Persiapan
                </button>
            </div>
        </div>
    );
}
