"use client";

import Image from "next/image";
import { Clock, Trash2, Check } from "lucide-react";

interface Member {
    id: string;
    avatar: string;
    name: string;
}

interface TaskCardProps {
    id: string;
    title: string;
    date: string;
    members: Member[];
    hasAttachment?: boolean;
    hasChecklist?: boolean;
    isCompleted?: boolean;
    onDelete?: () => void;
    onToggleComplete?: () => void;
    onClick?: () => void;
}

export default function TaskCard({ title, date, members, hasAttachment, hasChecklist, isCompleted, onDelete, onToggleComplete, onClick }: TaskCardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 p-4 rounded-xl border ${isCompleted ? 'border-gray-100 dark:border-gray-700' : 'border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500/30'} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group relative mb-4`}
        >
            {/* Delete Action - Visible on Hover */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
            >
                <Trash2 size={14} />
            </button>

            {/* Checkbox & Title */}
            <div className="flex items-start gap-3 mb-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleComplete?.(); }}
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border ${isCompleted
                        ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600"
                        } transition-all duration-200 flex items-center justify-center`}
                >
                    <Check
                        size={12}
                        className={isCompleted ? "text-white scale-100" : "text-transparent scale-0"}
                        strokeWidth={4}
                    />
                </button>
                <h4 className={`text-sm font-extrabold ${isCompleted ? "text-gray-400 dark:text-gray-500 line-through decoration-emerald-500/50" : "text-[#111827] dark:text-gray-100"} leading-snug transition-all duration-300`}>
                    {title}
                </h4>
            </div>

            {/* Footer: Date & Members */}
            <div className="flex items-center justify-between mt-auto">
                <div className="text-[11px] font-bold text-[#94a3b8] dark:text-gray-500">
                    {date}
                </div>

                <div className="flex items-center -space-x-2">
                    {members.map((member) => (
                        <div key={member.id} className="relative w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden shadow-sm">
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                    {/* Orange default user circle - only if no members or for flavor */}
                    {members.length === 0 && (
                        <div className="relative w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-orange-500 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">
                            U
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
