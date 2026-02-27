"use client";

import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

interface Task {
    id: string;
    title: string;
    date: string;
    assigneeAvatar?: string;
    assigneeInitial?: string;
}

interface KanbanColumnProps {
    title: string;
    count: number;
    tasks: Task[];
}

export default function KanbanColumn({ title, count, tasks }: KanbanColumnProps) {
    return (
        <div className="flex flex-col w-[280px] min-w-[280px] bg-[#F1F5F9]/30 dark:bg-gray-800/10 backdrop-blur-md rounded-[20px] border border-white/20 dark:border-gray-700/30 overflow-hidden shadow-2xl">
            {/* Column Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 dark:border-gray-700/20 bg-white/40 dark:bg-gray-800/20 relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E8532F] rounded-t-full"></div>
                
                <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-black text-gray-900 dark:text-white uppercase tracking-widest">
                        {title}
                    </h3>
                    <div className="w-5 h-5 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-[10px] font-bold text-gray-500 dark:text-gray-400">
                        {count}
                    </div>
                </div>
                
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 dark:text-gray-500 transition-colors">
                    <Plus size={16} />
                </button>
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {tasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>

            {/* Column Footer */}
            <div className="px-5 py-3 bg-white/10 dark:bg-gray-800/10">
                <button className="flex items-center gap-2 text-[12px] font-bold text-gray-500 dark:text-gray-400 hover:text-[#E8532F] dark:hover:text-orange-400 transition-colors">
                    <Plus size={14} />
                    Add task
                </button>
            </div>
        </div>
    );
}
