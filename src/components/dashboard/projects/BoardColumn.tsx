"use client";

import { Plus, X, Check } from "lucide-react";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface Task {
    id: string;
    title: string;
    date: string;
    members: any[];
}

interface BoardColumnProps {
    id: string;
    title: string;
    count: number;
    tasks: Task[];
    onAddTask: () => void;
    onAddInlineTask: (title: string) => void;
    onDeleteTask?: (taskId: string) => void;
    onToggleTaskComplete?: (taskId: string) => void;
    onTaskClick?: (task: Task) => void;
}

export default function BoardColumn({ id, title, count, tasks, onAddTask, onAddInlineTask, onDeleteTask, onToggleTaskComplete, onTaskClick }: BoardColumnProps) {
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
        <div className="flex-shrink-0 w-72 md:w-80 flex flex-col h-fit bg-white dark:bg-gray-800 rounded-xl border-t-4 border-t-orange-500 border-x border-b border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Column Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-extrabold text-[#1e293b] dark:text-gray-200 uppercase tracking-wide">
                        {title === "INREVIEW" ? "IN REVIEW" : title}
                    </h3>
                    <span className="bg-[#f1f5f9] dark:bg-gray-700 text-[#64748b] dark:text-gray-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        {count}
                    </span>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-[#94a3b8] hover:text-orange-500 transition-colors"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Tasks List */}
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-[100px]"
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TaskCard
                                            {...task}
                                            onDelete={() => onDeleteTask?.(task.id)}
                                            onToggleComplete={() => onToggleTaskComplete?.(task.id)}
                                            onClick={() => onTaskClick?.(task)}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {isAdding ? (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-500 shadow-md animate-in fade-in zoom-in-95 duration-200 mb-2">
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
                                className={`w-full ${id === 'TODO' ? 'mt-2' : 'mt-12'} py-2 flex items-center gap-2 text-[#64748b] dark:text-gray-400 hover:text-orange-500 text-sm font-semibold transition-colors bg-transparent`}
                            >
                                <Plus size={16} strokeWidth={3} />
                                <span>Add task</span>
                            </button>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
