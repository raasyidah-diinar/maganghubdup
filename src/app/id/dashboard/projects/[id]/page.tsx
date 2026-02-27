"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BoardHeader from "@/components/dashboard/projects/BoardHeader";
import { Loader2 } from "lucide-react";
import BoardColumn from "@/components/dashboard/projects/BoardColumn";
import AddTaskModal from "@/components/dashboard/projects/AddTaskModal";
import ArchivedItemsModal from "@/components/dashboard/projects/ArchivedItemsModal";
import ProjectDetailsModal from "@/components/dashboard/projects/ProjectDetailsModal";
import ProjectListView from "@/components/dashboard/projects/ProjectListView";
import ShareProjectModal from "@/components/dashboard/projects/ShareProjectModal";
import TaskDetailModal from "../../../../../components/dashboard/projects/TaskDetailModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;

    // Project Data Mapping
    const projectData: { [key: string]: { title: string; background: string } } = {
        "magang-hub": { title: "Magang Hub", background: "/pemandangan.png" },
        "chamber-dashboard": { title: "Chamber Dashboard", background: "/pemandangan1.png" },
        "finance-report-2024": { title: "Finance Report 2024", background: "/pemandangan.png" },
        "logistic-system": { title: "Logistic System", background: "/pemandangan1.png" },
    };

    const currentProject = projectData[projectId] || {
        title: projectId ? projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Project",
        background: "/pemandangan.png"
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [viewMode, setViewMode] = useState<"board" | "list">("board");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState("BACKLOG");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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

    const members = [
        { id: "me", name: "Daffa Aziz Ghiffari", email: "daffa@gmail.com", avatar: "/martin.png", role: "Member" as const },
        { id: "1", name: "Fatkul Amri", email: "amri@gmail.com", avatar: "/martin.png", role: "Admin" as const },
        { id: "2", name: "Rani", avatar: "/kazuha.png" },
        { id: "3", name: "Wisnu", avatar: "/martin.png" },
        { id: "4", name: "Chloe", avatar: "/kazuha.png" },
        { id: "5", name: "Hartley", avatar: "/martin.png" },
        { id: "6", name: "Jemima", avatar: "/kazuha.png" },
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
        isCompleted?: boolean;
        description?: string;
    }

    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
        BACKLOG: [],
        TODO: [
            { id: "t1", title: "Testing Smart Contract", date: "20 Feb", members: [members[0]], description: "Menjalankan unit testing untuk fungsionalitas minting dan transfer pada smart contract ERC-721 menggunakan Hardhat.", attachments: [{ id: "att1", type: "link", url: "https://github.com/org/repo/contracts/test.sol", title: "https://github.com/org/repo/contracts/test.sol" }] },
            { id: "t2", title: "Fixing Auth Bug", date: "25 Jan", members: [members[1]], description: "Fixing auth bug in login page" },
            { id: "t3", title: "Mobile App Mockup", date: "15 Feb", members: [members[0], members[1]], description: "Creating mockups for mobile application" },
        ],
        DOING: [],
        INREVIEW: [],
        DONE: [],
    });

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ task: Task, columnId: string } | null>(null);

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

    const handleRestoreArchivedTask = (title: string) => {
        const newTask: Task = {
            id: `restored-${Date.now()}`,
            title,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            members: [],
        };

        setTasks(prev => ({
            ...prev,
            TODO: [newTask, ...prev.TODO]
        }));
    };

    const handleOpenTaskDetail = (columnId: string, task: Task) => {
        setSelectedTask({ task, columnId });
        setIsDetailModalOpen(true);
    };

    const handleUpdateTaskDetail = (taskData: Task, newColumnId?: string) => {
        if (!selectedTask) return;

        const { columnId: oldColumnId } = selectedTask;
        const targetColumnId = newColumnId || oldColumnId;

        setTasks(prev => {
            const newTasks = { ...prev };

            if (targetColumnId !== oldColumnId) {
                // Remove from old column
                newTasks[oldColumnId] = newTasks[oldColumnId].filter(t => t.id !== taskData.id);
                // Add to new column
                newTasks[targetColumnId] = [...newTasks[targetColumnId], taskData];
            } else {
                // Just update in place
                newTasks[oldColumnId] = newTasks[oldColumnId].map(t =>
                    t.id === taskData.id ? taskData : t
                );
            }

            return newTasks;
        });

        setIsDetailModalOpen(false);
        setSelectedTask(null);
    };

    const handleToggleTaskComplete = (column: string, taskId: string) => {
        setTasks(prev => ({
            ...prev,
            [column]: prev[column].map(t =>
                t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
            )
        }));
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceColumn = tasks[source.droppableId];
        const destColumn = tasks[destination.droppableId];
        const sourceTasks = [...sourceColumn];
        const destTasks = source.droppableId === destination.droppableId ? sourceTasks : [...destColumn];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        if (source.droppableId === destination.droppableId) {
            setTasks(prev => ({
                ...prev,
                [source.droppableId]: destTasks
            }));
        } else {
            setTasks(prev => ({
                ...prev,
                [source.droppableId]: sourceTasks,
                [destination.droppableId]: destTasks
            }));
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className="relative flex-1 overflow-hidden flex flex-col">
                    {/* Background Image - Absolute and covers full height */}
                    <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoading ? "bg-gray-50 dark:bg-gray-900 opacity-0" : "opacity-100"}`}>
                        <img
                            src={currentProject.background}
                            className="w-full h-full object-cover opacity-90"
                            alt="bg"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Sticky Header - Flush with top DashboardHeader */}
                    <div className="sticky top-0 z-50 bg-white dark:bg-white px-4 md:px-6 py-4 shadow-sm">
                        <BoardHeader
                            title={isLoading ? "Loading Project..." : currentProject.title}
                            onAddTask={() => handleAddTaskClick("BACKLOG")}
                            onShare={() => setIsShareModalOpen(true)}
                            viewMode={viewMode}
                            onChangeView={setViewMode}
                            onOpenArchive={() => setIsArchiveModalOpen(true)}
                            onOpenAbout={() => setIsAboutModalOpen(true)}
                        />
                    </div>

                    <main className="relative z-10 flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center gap-4 transition-all animate-in fade-in duration-500">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-gray-100 dark:border-gray-700 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            </div>
                        ) : viewMode === "board" ? (
                            /* Board Columns - Scrollable Horizontally */
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="flex-1 overflow-x-auto overflow-y-auto relative z-0 custom-scrollbar">
                                    <div className="flex items-start min-h-full gap-4 pb-4 px-1 min-w-max">
                                        {Object.entries(tasks).map(([columnId, columnTasks]) => (
                                            <BoardColumn
                                                key={columnId}
                                                id={columnId}
                                                title={columnId.replace("_", " ")} // formatting if needed
                                                count={columnTasks.length}
                                                tasks={columnTasks}
                                                onAddTask={() => handleAddTaskClick(columnId)}
                                                onAddInlineTask={(title: string) => handleAddInlineTask(columnId, title)}
                                                onDeleteTask={(taskId) => handleDeleteTask(columnId, taskId)}
                                                onToggleTaskComplete={(taskId) => handleToggleTaskComplete(columnId, taskId)}
                                                onTaskClick={(task) => handleOpenTaskDetail(columnId, task)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </DragDropContext>
                        ) : (
                            <ProjectListView
                                tasks={tasks}
                                onDeleteTask={handleDeleteTask}
                                onAddTask={() => handleAddTaskClick("BACKLOG")}
                                onTaskClick={(task, columnId) => handleOpenTaskDetail(columnId, task)}
                            />
                        )}
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
                onRestore={handleRestoreArchivedTask}
            />

            <ProjectDetailsModal
                isOpen={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
                project={currentProject}
            />

            {selectedTask && (
                <TaskDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false);
                        setSelectedTask(null);
                    }}
                    task={selectedTask.task}
                    columnId={selectedTask.columnId}
                    onSave={handleUpdateTaskDetail}
                    boardMembers={members}
                />
            )}

            <ShareProjectModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                members={members.filter(m => (m as any).email) as any}
            />
        </div>
    );
}
