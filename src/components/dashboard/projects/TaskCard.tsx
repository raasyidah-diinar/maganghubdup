"use client";

import Image from "next/image";
import { Clock, Trash2 } from "lucide-react";

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
    onDelete?: () => void;
}

export default function TaskCard({ title, date, members, hasAttachment, hasChecklist, onDelete }: TaskCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative">
            {/* Delete Action - Visible on Hover */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
            >
                <Trash2 size={14} />
            </button>

            {/* Checkbox & Title */}
            <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 w-4 h-4 rounded border border-gray-300 dark:border-gray-600 group-hover:border-orange-500 transition-colors"></div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                    {title}
                </h4>
            </div>

            {/* Footer: Date & Members */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{date}</span>
                </div>

                <div className="flex items-center -space-x-1.5">
                    {members.map((member, index) => (
                        <div key={member.id} className="relative w-5 h-5 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                    {/* Orange default user circle */}
                    <div className="relative w-5 h-5 rounded-full ring-2 ring-white dark:ring-gray-800 bg-orange-500 flex items-center justify-center text-[8px] text-white font-bold">
                        U
                    </div>
                </div>
            </div>
        </div>
    );
}
