"use client";

import { Plus, X, Check } from "lucide-react";
import TaskCard from "./TaskCard";
import { useState } from "react";

interface Task {
    id: string;
    title: string;
    date: string;
    members: any[];
}

interface BoardColumnProps {
    title: string;
    count: number;
    tasks: Task[];
    onAddTask: () => void;
    onAddInlineTask: (title: string) => void;
    onDeleteTask?: (taskId: string) => void;
}

export default function BoardColumn({ title, count, tasks, onAddTask, onAddInlineTask, onDeleteTask }: BoardColumnProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleSaveNewTask = () => {
        if (newTaskTitle.trim()) {
            onAddInlineTask(newTaskTitle);
            setNewTaskTitle("");
            setIsAdding(false);
        }
    };

    return (
        <div className="flex-shrink-0 w-72 md:w-80 flex flex-col h-full max-h-full">
            {/* Column Header */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{title}</h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        {count}
                    </span>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Tasks List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        {...task}
                        onDelete={() => onDeleteTask?.(task.id)}
                    />
                ))}

                {isAdding ? (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-500 shadow-md animate-in fade-in zoom-in-95 duration-200">
                        <textarea
                            autoFocus
                            placeholder="Judul tugas..."
                            className="w-full text-sm font-semibold bg-transparent border-none focus:outline-none resize-none mb-2 text-gray-800 dark:text-white"
                            rows={2}
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSaveNewTask();
                                }
                            }}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400"
                            >
                                <X size={16} />
                            </button>
                            <button
                                onClick={handleSaveNewTask}
                                className="p-1 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded text-orange-500"
                            >
                                <Check size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full py-2 flex items-center gap-2 text-gray-400 hover:text-orange-500 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} />
                        <span>Add task</span>
                    </button>
                )}
            </div>
        </div>
    );
}
