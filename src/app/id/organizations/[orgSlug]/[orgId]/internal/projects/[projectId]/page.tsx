"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BoardHeader from "@/components/dashboard/projects/BoardHeader";
import { Loader2 } from "lucide-react";
import BoardColumn from "@/components/dashboard/projects/BoardColumn";
import AddTaskModal from "@/components/dashboard/projects/AddTaskModal";
import ArchivedItemsModal from "@/components/dashboard/projects/ArchivedItemsModal";
import ProjectDetailsModal from "@/components/dashboard/projects/ProjectDetailsModal";
import ProjectListView from "@/components/dashboard/projects/ProjectListView";
import ShareProjectModal from "@/components/dashboard/projects/ShareProjectModal";
import TaskDetailModal from "@/components/dashboard/projects/TaskDetailModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function InternalProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.projectId as string;
    const orgSlug = params.orgSlug as string;
    const orgId = params.orgId as string;

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

    const [viewMode, setViewMode] = useState<"board" | "list">("board");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState("BACKLOG");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
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
            { id: "t1", title: "Testing Smart Contract", date: "20 Feb", members: [members[0] as any], description: "Menjalankan unit testing untuk fungsionalitas minting dan transfer pada smart contract ERC-721 menggunakan Hardhat.", attachments: [{ id: "att1", type: "link", url: "https://github.com/org/repo/contracts/test.sol", title: "https://github.com/org/repo/contracts/test.sol" }] },
            { id: "t2", title: "Fixing Auth Bug", date: "25 Jan", members: [members[1] as any], description: "Fixing auth bug in login page" },
            { id: "t3", title: "Mobile App Mockup", date: "15 Feb", members: [members[0] as any, members[1] as any], description: "Creating mockups for mobile application" },
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
            members: [],
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
            [column]: [newTask as any, ...prev[column]]
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
                newTasks[oldColumnId] = newTasks[oldColumnId].filter(t => t.id !== taskData.id);
                newTasks[targetColumnId] = [...newTasks[targetColumnId], taskData];
            } else {
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
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = tasks[source.droppableId];
        const destColumn = tasks[destination.droppableId];
        const sourceTasks = [...sourceColumn];
        const destTasks = source.droppableId === destination.droppableId ? sourceTasks : [...destColumn];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        if (source.droppableId === destination.droppableId) {
            setTasks(prev => ({ ...prev, [source.droppableId]: destTasks }));
        } else {
            setTasks(prev => ({ ...prev, [source.droppableId]: sourceTasks, [destination.droppableId]: destTasks }));
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden relative bg-white dark:bg-gray-900">
            {/* Background Image - Absolute and covers full height within this container */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoading ? "bg-gray-50 dark:bg-gray-900 opacity-0" : "opacity-100"}`}>
                <img
                    src={currentProject.background}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    alt="bg"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Sticky Board Header */}
            <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-8 md:px-14 py-4 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <BoardHeader
                    title={isLoading ? "Loading..." : currentProject.title}
                    onAddTask={() => handleAddTaskClick("BACKLOG")}
                    onShare={() => setIsShareModalOpen(true)}
                    viewMode={viewMode}
                    onChangeView={setViewMode}
                    onOpenArchive={() => setIsArchiveModalOpen(true)}
                    onOpenAbout={() => setIsAboutModalOpen(true)}
                />
            </div>

            <main className="relative z-0 flex-1 flex flex-col p-0 overflow-hidden min-h-0">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-4 transition-all animate-in fade-in duration-500 shadow-xl">
                            <div className="relative">
                                <div className="w-12 h-12 border-[3px] border-gray-100 dark:border-gray-700 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-12 h-12 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing Board...</span>
                        </div>
                    </div>
                ) : viewMode === "board" ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex-1 overflow-x-auto overflow-y-auto relative z-0 custom-scrollbar">
                            <div className="flex items-start min-h-full gap-8 pb-10 pt-10 px-14 min-w-max">
                                {Object.entries(tasks).map(([columnId, columnTasks]) => (
                                    <BoardColumn
                                        key={columnId}
                                        id={columnId}
                                        title={columnId.replace("_", " ")}
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
                    boardMembers={members as any}
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
