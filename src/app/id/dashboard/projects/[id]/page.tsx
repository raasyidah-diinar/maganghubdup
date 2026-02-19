"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BoardHeader from "@/components/dashboard/projects/BoardHeader";
import BoardColumn from "@/components/dashboard/projects/BoardColumn";
import AddTaskModal from "@/components/dashboard/projects/AddTaskModal";
import ArchivedItemsModal from "@/components/dashboard/projects/ArchivedItemsModal";

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;

    // Convert url slug to title roughly
    const projectTitle = projectId
        ? projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Project";

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [viewMode, setViewMode] = useState<"board" | "list">("board");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState("BACKLOG");

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mock Data
    const members = [
        { id: "1", name: "Daffa", avatar: "/martin.png" },
        { id: "2", name: "Rani", avatar: "/kazuha.png" },
    ];

    // Define types
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
        members: { id: string, name: string, avatar: string }[];
        attachments?: Attachment[];
    }

    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
        BACKLOG: [],
        TODO: [
            { id: "t1", title: "Testing Smart Contract", date: "20 Feb", members: [members[0]] },
            { id: "t2", title: "Fixing Auth Bug", date: "25 Jan", members: [members[1]] },
            { id: "t3", title: "Mobile App Mockup", date: "15 Feb", members: [members[0], members[1]] },
        ],
        DOING: [],
        INREVIEW: [],
    });

    const handleAddTaskClick = (column = "BACKLOG") => {
        setActiveColumn(column);
        setIsTaskModalOpen(true);
    }

    const handleCreateTask = (newTask: any) => {
        const task: Task = {
            id: `t-${Date.now()}`,
            title: newTask.title,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            members: [], // Mock members for now
            attachments: newTask.attachments
        };

        setTasks(prev => ({
            ...prev,
            [newTask.column]: [task, ...prev[newTask.column]]
        }));
    }

    const handleAddInlineTask = (column: string, title: string) => {
        const newTask = {
            id: `new-${Date.now()}`,
            title,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            members: []
        };

        setTasks(prev => ({
            ...prev,
            [column]: [newTask, ...prev[column]] // Add to top
        }));
    };

    const handleDeleteTask = (column: string, taskId: string) => {
        setTasks(prev => ({
            ...prev,
            [column]: prev[column].filter(t => t.id !== taskId)
        }));
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className="relative flex-1 overflow-hidden flex flex-col">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 opactiy-20">
                        <img
                            src="/pemandangan.png"
                            className="w-full h-full object-cover opacity-90"
                            alt="bg"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    <main className="relative z-10 flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-4 shadow-sm mb-6 relative z-50">
                            <BoardHeader
                                title={projectTitle}
                                onAddTask={() => handleAddTaskClick("BACKLOG")}
                                viewMode={viewMode}
                                onChangeView={setViewMode}
                                onOpenArchive={() => setIsArchiveModalOpen(true)}
                            />
                        </div>

                        {/* Board Columns - Scrollable Horizontally */}
                        <div className="flex-1 overflow-x-auto overflow-y-hidden relative z-0">
                            <div className="flex h-full gap-4 pb-4 px-1 min-w-max">
                                {Object.entries(tasks).map(([columnId, columnTasks]) => (
                                    <BoardColumn
                                        key={columnId}
                                        title={columnId.replace("_", " ")} // formatting if needed
                                        count={columnTasks.length}
                                        tasks={columnTasks}
                                        onAddTask={() => handleAddTaskClick(columnId)}
                                        onAddInlineTask={(title: string) => handleAddInlineTask(columnId, title)}
                                        onDeleteTask={(taskId) => handleDeleteTask(columnId, taskId)}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <AddTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                currentColumn={activeColumn}
                onSave={handleCreateTask}
            />

            <ArchivedItemsModal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
            />
        </div>
    );
}
