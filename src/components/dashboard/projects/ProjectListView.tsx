"use client";

import { MoreVertical, Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Member {
    id: string;
    name: string;
    avatar: string;
}

interface Attachment {
    id: string;
    type: "link" | "file";
    url: string;
    title: string;
}

interface Task {
    id: string;
    title: string;
    date: string;
    members: Member[];
    attachments?: Attachment[];
    isCompleted?: boolean;
    description?: string;
}

interface ProjectListViewProps {
    tasks: { [key: string]: Task[] };
    onDeleteTask: (columnId: string, taskId: string) => void;
    onAddTask?: () => void;
    onTaskClick?: (task: Task, columnId: string) => void;
}

export default function ProjectListView({ tasks, onDeleteTask, onAddTask, onTaskClick }: ProjectListViewProps) {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 4, left: rect.right - 144 });
        setOpenDropdownId(openDropdownId === taskId ? null : taskId);
    };

    useEffect(() => {
        const handleScroll = () => setOpenDropdownId(null);
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    // Flatten tasks into a single list for table view
    const allTasks = Object.entries(tasks).flatMap(([columnId, columnTasks]) =>
        columnTasks.map(task => ({ ...task, status: columnId }))
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "DONE":
                return <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-black tracking-wide">completed</span>;
            case "TODO":
            case "BACKLOG":
                return <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black tracking-wide">todo</span>;
            case "DOING":
                return <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black tracking-wide">in progress</span>;
            case "INREVIEW":
                return <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black tracking-wide">review</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-black tracking-wide">{status.toLowerCase()}</span>;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden flex flex-col w-full h-fit max-h-full relative overflow-y-auto">
            <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                            <th className="px-6 py-4 text-[13px] font-bold text-[#1e293b] dark:text-gray-300">Nama Tugas</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-[#1e293b] dark:text-gray-300">Anggota</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-[#1e293b] dark:text-gray-300">Status</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-[#1e293b] dark:text-gray-300">Deadline</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-[#1e293b] dark:text-gray-300">Deskripsi</th>
                            <th className="px-6 py-4 text-right">
                                <button
                                    onClick={onAddTask}
                                    className="inline-flex text-[#FF6B35] hover:text-[#E8532F] transition-colors p-1"
                                >
                                    <Plus size={18} strokeWidth={2.5} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-[13px]">
                        {allTasks.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                                    Tidak ada tugas ditemukan.
                                </td>
                            </tr>
                        ) : (
                            allTasks.map((task) => (
                                <tr key={task.id} className="hover:bg-[#f0f9ff] dark:hover:bg-blue-900/10 transition-colors group bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                                    <td className="px-6 py-3.5">
                                        <span className="font-bold text-[#1e293b] dark:text-white">
                                            {task.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            {task.members.length > 0 ? (
                                                <>
                                                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                                        <Image
                                                            src={task.members[0].avatar || "/hyein.png"}
                                                            alt={task.members[0].name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-[#64748b] dark:text-gray-400 font-medium">
                                                        {task.members[0].name}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 font-bold flex items-center justify-center text-[10px]">
                                                        UN
                                                    </div>
                                                    <span className="text-[#64748b] dark:text-gray-400 font-medium">
                                                        Unassigned
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        {getStatusBadge(task.status)}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className="text-[#64748b] dark:text-gray-400 font-semibold">{task.date} 2024</span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className="text-[#94a3b8] dark:text-gray-500 font-medium truncate block max-w-[200px]" title={task.description}>
                                            {task.description || "Tidak ada deskripsi..."}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right relative">
                                        <button
                                            onClick={(e) => handleOpenDropdown(e, task.id)}
                                            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openDropdownId === task.id && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdownId(null)}></div>
                                                <div
                                                    className="fixed w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 py-1 flex flex-col animate-in fade-in zoom-in-95 duration-100"
                                                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setOpenDropdownId(null);
                                                            if (onTaskClick) onTaskClick(task as unknown as Task, task.status);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#475569] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    >
                                                        <Pencil size={16} className="text-[#64748b]" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setOpenDropdownId(null);
                                                            onDeleteTask(task.status, task.id);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                                                    >
                                                        <Trash2 size={16} />
                                                        <span>Archive</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
