"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskCardProps {
    id: string;
    title: string;
    date: string;
    assigneeAvatar?: string;
    assigneeInitial?: string;
}

export default function TaskCard({ title, date, assigneeAvatar, assigneeInitial }: TaskCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing">
            <div className="flex items-start gap-3">
                <Checkbox className="mt-1 border-gray-300 data-[state=checked]:bg-[#E8532F] data-[state=checked]:border-[#E8532F]" />
                <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 leading-snug mb-3 group-hover:text-[#E8532F] transition-colors">
                        {title}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-tighter">
                            {date}
                        </span>
                        
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            {assigneeAvatar ? (
                                <Image 
                                    src={assigneeAvatar} 
                                    alt="Assignee" 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white text-[9px] font-black uppercase">
                                    {assigneeInitial}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
