"use client";

import { X, Paperclip, ListTodo, Calendar, Plus, MoreHorizontal, Check, ChevronDown, Save, Upload, CloudUpload, CheckSquare, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Member {
    id: string;
    avatar: string;
    name: string;
}

interface Attachment {
    id: string;
    type: "link" | "file";
    url: string;
    title: string;
}

interface ChecklistItem {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface Checklist {
    id: string;
    title: string;
    items: ChecklistItem[];
}

interface Task {
    id: string;
    title: string;
    date: string;
    members: Member[];
    attachments?: Attachment[];
    isCompleted?: boolean;
    description?: string;
    checklists?: Checklist[];
}

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    columnId: string;
    onSave: (task: any, newColumnId: string) => void;
    boardMembers: Member[];
}

export default function TaskDetailModal({ isOpen, onClose, task, columnId, onSave, boardMembers }: TaskDetailModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);
    const [attachments, setAttachments] = useState<Attachment[]>(task.attachments || []);
    const [checklists, setChecklists] = useState<Checklist[]>(task.checklists || []);
    const [showMorePopover, setShowMorePopover] = useState(false);
    const [showAttachmentPopover, setShowAttachmentPopover] = useState(false);
    const [showChecklistPopover, setShowChecklistPopover] = useState(false);
    const [showMemberPopover, setShowMemberPopover] = useState(false);
    const [attachmentTab, setAttachmentTab] = useState<"link" | "file">("link");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const checklistPopoverRef = useRef<HTMLDivElement>(null);

    // Checklist form state
    const [newChecklistTitle, setNewChecklistTitle] = useState("");
    const [copyFromChecklist, setCopyFromChecklist] = useState<string | null>(null);
    const [showCopyFromDropdown, setShowCopyFromDropdown] = useState(false);
    const [activeAddItemId, setActiveAddItemId] = useState<string | null>(null);
    const [itemTitleInput, setItemTitleInput] = useState("");
    const [currentColumnId, setCurrentColumnId] = useState(columnId);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [assignedMembers, setAssignedMembers] = useState<Member[]>(task.members);
    const [searchMemberQuery, setSearchMemberQuery] = useState("");
    const [assignedDate, setAssignedDate] = useState(task.date);
    const [showDeadlinePopover, setShowDeadlinePopover] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Attachment form state
    const [linkUrl, setLinkUrl] = useState("");
    const [linkTitle, setLinkTitle] = useState("");
    const [uploadFileName, setUploadFileName] = useState("");

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description || "");
        setIsCompleted(task.isCompleted || false);
        setAttachments(task.attachments || []);
        setChecklists(task.checklists || []);
        setAssignedMembers(task.members);
        setAssignedDate(task.date);
    }, [task]);

    // Click outside popovers
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (checklistPopoverRef.current && !checklistPopoverRef.current.contains(event.target as Node)) {
                setShowChecklistPopover(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInsertLink = () => {
        if (!linkUrl) return;

        const newAttachment: Attachment = {
            id: Math.random().toString(36).substr(2, 9),
            type: "link",
            url: linkUrl,
            title: linkTitle || linkUrl
        };

        setAttachments(prev => [...prev, newAttachment]);
        setLinkUrl("");
        setLinkTitle("");
        setShowAttachmentPopover(false);
    };

    const handleInsertFile = () => {
        if (!uploadFileName) return;

        const newAttachment: Attachment = {
            id: Math.random().toString(36).substr(2, 9),
            type: "file",
            url: "#",
            title: uploadFileName
        };

        setAttachments(prev => [...prev, newAttachment]);
        setUploadFileName("");
        setShowAttachmentPopover(false);
    };

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 800));

        onSave({
            ...task,
            title,
            description,
            isCompleted,
            attachments,
            checklists,
            members: assignedMembers,
            date: assignedDate
        }, currentColumnId);

        setIsSaving(false);
    };

    const handleAddChecklist = () => {
        if (!newChecklistTitle.trim()) return;

        const newChecklist: Checklist = {
            id: Math.random().toString(36).substr(2, 9),
            title: newChecklistTitle,
            items: []
        };

        setChecklists(prev => [...prev, newChecklist]);
        setNewChecklistTitle("");
        setCopyFromChecklist(null);
        setShowChecklistPopover(false);
    };

    const handleAddChecklistItem = (checklistId: string, itemTitle: string) => {
        if (!itemTitle.trim()) return;

        setChecklists(prev => prev.map(cl => {
            if (cl.id === checklistId) {
                return {
                    ...cl,
                    items: [...cl.items, {
                        id: Math.random().toString(36).substr(2, 9),
                        title: itemTitle,
                        isCompleted: false
                    }]
                };
            }
            return cl;
        }));
    };

    const handleToggleChecklistItem = (checklistId: string, itemId: string) => {
        setChecklists(prev => prev.map(cl => {
            if (cl.id === checklistId) {
                return {
                    ...cl,
                    items: cl.items.map(item =>
                        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
                    )
                };
            }
            return cl;
        }));
    };

    const handleDeleteChecklistItem = (checklistId: string, itemId: string) => {
        setChecklists(prev => prev.map(cl => {
            if (cl.id === checklistId) {
                return {
                    ...cl,
                    items: cl.items.filter(item => item.id !== itemId)
                };
            }
            return cl;
        }));
    };

    const handleDeleteChecklist = (checklistId: string) => {
        setChecklists(prev => prev.filter(cl => cl.id !== checklistId));
    };

    const calculateProgress = (items: ChecklistItem[]) => {
        if (items.length === 0) return 0;
        const completed = items.filter(item => item.isCompleted).length;
        return Math.round((completed / items.length) * 100);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 flex justify-between items-start shrink-0">
                    <h2 className="text-lg font-extrabold text-[#1e293b] dark:text-white mt-1">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="px-6 pb-6 space-y-6 overflow-y-auto custom-scrollbar relative">

                    {/* Mark as Done & Status Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setIsCompleted(!isCompleted)}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                                ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                : "bg-white border-gray-200 group-hover:border-emerald-500"
                                }`}>
                                <Check size={14} className={isCompleted ? "text-white" : "text-transparent"} strokeWidth={3} />
                            </div>
                            <span className={`text-sm font-bold ${isCompleted ? "text-emerald-600" : "text-gray-600"} transition-colors`}>
                                {isCompleted ? "Task Completed" : "Mark as Done"}
                            </span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowMorePopover(!showMorePopover)}
                                className={`p-1.5 rounded-lg transition-colors ${showMorePopover ? "bg-gray-100 text-gray-900" : "text-gray-300 hover:text-gray-600"}`}
                            >
                                <MoreHorizontal size={20} />
                            </button>

                            {/* More Popover */}
                            {showMorePopover && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowMorePopover(false)}
                                    ></div>
                                    <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
                                        <button
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
                                            onClick={() => {
                                                // Archive logic would go here
                                                setShowMorePopover(false);
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="21 8 21 21 3 21 3 8"></polyline>
                                                <rect x="1" y="3" width="22" height="5"></rect>
                                                <line x1="10" y1="12" x2="14" y2="12"></line>
                                            </svg>
                                            Archive
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <QuickButton
                                icon={<Paperclip size={14} />}
                                label="Lampiran"
                                onClick={() => setShowAttachmentPopover(!showAttachmentPopover)}
                                active={showAttachmentPopover}
                            />

                            {/* Attachment Popover */}
                            {showAttachmentPopover && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowAttachmentPopover(false)}
                                    ></div>
                                    <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                        {/* Tabs */}
                                        <div className="flex border-b border-gray-50 dark:border-gray-700/50">
                                            <button
                                                className={`flex-1 py-3 text-xs font-bold transition-all relative ${attachmentTab === "link" ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
                                                onClick={() => setAttachmentTab("link")}
                                            >
                                                Link / Tautan
                                                {attachmentTab === "link" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>}
                                            </button>
                                            <button
                                                className={`flex-1 py-3 text-xs font-bold transition-all relative ${attachmentTab === "file" ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
                                                onClick={() => setAttachmentTab("file")}
                                            >
                                                Upload File
                                                {attachmentTab === "file" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>}
                                            </button>
                                        </div>

                                        <div className="p-4 space-y-4">
                                            {attachmentTab === "link" ? (
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5">URL Tautan</label>
                                                        <input
                                                            type="text"
                                                            placeholder="https://..."
                                                            className="w-full px-3 py-2 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:border-orange-200 transition-all"
                                                            value={linkUrl}
                                                            onChange={(e) => setLinkUrl(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5">Judul Tautan (Opsional)</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: Desain Figma"
                                                            className="w-full px-3 py-2 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:border-orange-200 transition-all"
                                                            value={linkTitle}
                                                            onChange={(e) => setLinkTitle(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) setUploadFileName(file.name);
                                                        }}
                                                    />
                                                    <div
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-orange-200 transition-all bg-[#f8fafc] dark:bg-gray-900"
                                                    >
                                                        <div className="text-orange-500 transition-transform">
                                                            <CloudUpload size={28} />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400">
                                                            {uploadFileName || "Pilih file"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5">NAMA FILE (OPSIONAL)</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Nama tampilan file..."
                                                            className="w-full px-3 py-2 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:border-orange-200 transition-all font-medium"
                                                            value={uploadFileName}
                                                            onChange={(e) => setUploadFileName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex justify-end items-center gap-3 pt-2">
                                                <button
                                                    className="text-xs font-bold text-gray-500 hover:text-gray-700"
                                                    onClick={() => setShowAttachmentPopover(false)}
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    className="px-6 py-2 bg-[#ff6300] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50"
                                                    disabled={attachmentTab === "link" ? !linkUrl : !uploadFileName}
                                                    onClick={attachmentTab === "link" ? handleInsertLink : handleInsertFile}
                                                >
                                                    Insert
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="relative">
                            <QuickButton
                                icon={<ListTodo size={14} />}
                                label="Checklist"
                                onClick={() => setShowChecklistPopover(!showChecklistPopover)}
                                active={showChecklistPopover}
                            />

                            {/* Add Checklist Popover */}
                            {showChecklistPopover && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowChecklistPopover(false)}
                                    ></div>
                                    <div
                                        ref={checklistPopoverRef}
                                        className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-700/50">
                                            <h5 className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center">Add Checklist</h5>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Checklist"
                                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-orange-200 transition-all font-medium placeholder:text-gray-400"
                                                    value={newChecklistTitle}
                                                    onChange={(e) => setNewChecklistTitle(e.target.value)}
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider">COPY FROM... (OPTIONAL)</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowCopyFromDropdown(!showCopyFromDropdown)}
                                                        className="w-full px-3 py-2 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs flex items-center justify-between text-gray-500 font-bold"
                                                    >
                                                        {copyFromChecklist || "Select a checklist..."}
                                                        <ChevronDown size={14} className={`transition-transform ${showCopyFromDropdown ? "rotate-180" : ""}`} />
                                                    </button>

                                                    {showCopyFromDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-30">
                                                            <button
                                                                onClick={() => {
                                                                    setCopyFromChecklist("Development Steps");
                                                                    setShowCopyFromDropdown(false);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                            >
                                                                Development Steps
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleAddChecklist}
                                                className="w-full py-3 bg-[#ff6300] text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-600 transition-all active:scale-95"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                className="flex items-center justify-between gap-3 min-w-[120px] px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-extrabold text-[#111827] dark:text-gray-200 shadow-sm hover:bg-gray-50 transition-all"
                            >
                                <span>{currentColumnId === "INREVIEW" ? "IN REVIEW" : currentColumnId.replace("_", " ")}</span>
                                <ChevronDown size={14} className="text-gray-400 shrink-0" />
                            </button>

                            {isStatusDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsStatusDropdownOpen(false)}
                                    ></div>
                                    <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
                                        {[
                                            { id: "BACKLOG", label: "Backlog" },
                                            { id: "TODO", label: "To Do" },
                                            { id: "DOING", label: "Doing" },
                                            { id: "INREVIEW", label: "In Review" },
                                            { id: "DONE", label: "Done" }
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition-colors ${currentColumnId === opt.id
                                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    }`}
                                                onClick={() => {
                                                    setCurrentColumnId(opt.id);
                                                    setIsStatusDropdownOpen(false);
                                                }}
                                            >
                                                <span>{opt.label}</span>
                                                {currentColumnId === opt.id && <Check size={14} className="text-blue-600" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Members & Deadline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider mb-2">Members</h4>
                            <div className="flex items-center gap-2">
                                {assignedMembers.map(member => (
                                    <div key={member.id} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden ring-1 ring-gray-100 shadow-sm">
                                        <Image src={member.avatar} alt={member.name} width={32} height={32} className="object-cover" />
                                    </div>
                                ))}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowMemberPopover(!showMemberPopover)}
                                        className={`w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all ${showMemberPopover ? "text-orange-500 border-orange-500" : ""}`}
                                    >
                                        <Plus size={16} />
                                    </button>

                                    {showMemberPopover && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowMemberPopover(false)}
                                            ></div>
                                            <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-gray-700 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                                <div className="p-4 space-y-4">
                                                    <h5 className="text-sm font-bold text-[#1e293b] dark:text-gray-200 text-center">Members</h5>

                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Search members"
                                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-500/30 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-400 font-medium"
                                                            value={searchMemberQuery}
                                                            onChange={(e) => setSearchMemberQuery(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>

                                                    <div className="space-y-3 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                                                        {/* Assigned Members */}
                                                        {assignedMembers.length > 0 && (
                                                            <div>
                                                                <h6 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">CARD MEMBERS</h6>
                                                                <div className="space-y-0.5">
                                                                    {assignedMembers.filter(m => m.name.toLowerCase().includes(searchMemberQuery.toLowerCase())).map(member => (
                                                                        <div key={member.id} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                                                                                    <Image src={member.avatar} alt={member.name} width={28} height={28} className="object-cover" />
                                                                                </div>
                                                                                <span className="text-xs font-bold text-[#1e293b] dark:text-gray-200">{member.name}</span>
                                                                            </div>
                                                                            <button
                                                                                onClick={() => setAssignedMembers(prev => prev.filter(m => m.id !== member.id))}
                                                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                                            >
                                                                                <X size={12} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Board Members */}
                                                        <div>
                                                            <h6 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">BOARD MEMBERS</h6>
                                                            <div className="space-y-0.5">
                                                                {boardMembers
                                                                    .filter(m => !assignedMembers.some(am => am.id === m.id))
                                                                    .filter(m => m.name.toLowerCase().includes(searchMemberQuery.toLowerCase()))
                                                                    .map(member => (
                                                                        <div
                                                                            key={member.id}
                                                                            onClick={() => setAssignedMembers(prev => [...prev, member])}
                                                                            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                                                                        >
                                                                            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                                                                                <Image src={member.avatar} alt={member.name} width={28} height={28} className="object-cover" />
                                                                            </div>
                                                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{member.name}</span>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider mb-2">Batas Waktu</h4>
                            <div className="relative">
                                <button
                                    onClick={() => setShowDeadlinePopover(!showDeadlinePopover)}
                                    className={`inline-flex items-center gap-2 px-3 py-2 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold text-[#1e293b] dark:text-gray-200 transition-all hover:bg-white hover:shadow-sm ${showDeadlinePopover ? "border-orange-200 shadow-sm bg-white" : ""}`}
                                >
                                    <Calendar size={14} className="text-orange-500" />
                                    <span>{assignedDate} 2024</span>
                                </button>

                                {showDeadlinePopover && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowDeadlinePopover(false)}
                                        ></div>
                                        <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-black/40 border border-gray-100 dark:border-gray-700 z-[50] animate-in fade-in zoom-in-95 duration-200">
                                            <div className="p-2">
                                                {/* Calendar Header */}
                                                <div className="flex items-center justify-between mb-2 px-1">
                                                    <button
                                                        onClick={() => {
                                                            if (currentMonth === 0) {
                                                                setCurrentMonth(11);
                                                                setCurrentYear(currentYear - 1);
                                                            } else {
                                                                setCurrentMonth(currentMonth - 1);
                                                            }
                                                        }}
                                                        className="p-1 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    >
                                                        <ChevronLeft size={16} />
                                                    </button>
                                                    <span className="text-xs font-bold text-[#111827] dark:text-gray-200">
                                                        {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth))} {currentYear}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            if (currentMonth === 11) {
                                                                setCurrentMonth(0);
                                                                setCurrentYear(currentYear + 1);
                                                            } else {
                                                                setCurrentMonth(currentMonth + 1);
                                                            }
                                                        }}
                                                        className="p-1 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    >
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </div>

                                                {/* Days of week */}
                                                <div className="grid grid-cols-7 gap-0.5 mb-0 text-center">
                                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                                        <span key={day} className="text-[7px] font-bold text-gray-400 py-0.5">{day}</span>
                                                    ))}
                                                </div>

                                                {/* Days Grid */}
                                                <div className="grid grid-cols-7 gap-0.5 text-center">
                                                    {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                                                        <div key={`empty-${i}`} className="p-1.5"></div>
                                                    ))}
                                                    {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }).map((_, i) => {
                                                        const dayNum = i + 1;
                                                        const isSelected = assignedDate === `${dayNum} ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentYear, currentMonth))}`;
                                                        const isToday = new Date().getDate() === dayNum && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;

                                                        return (
                                                            <button
                                                                key={dayNum}
                                                                onClick={() => {
                                                                    const dateStr = `${dayNum} ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentYear, currentMonth))}`;
                                                                    setAssignedDate(dateStr);
                                                                }}
                                                                className={`p-1.5 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center ${isSelected
                                                                    ? "bg-[#ff6300] text-white shadow-lg shadow-orange-100"
                                                                    : isToday
                                                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                    }`}
                                                            >
                                                                {dayNum}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Footer Actions */}
                                            <div className="px-3 py-1.5 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
                                                <button
                                                    onClick={() => setShowDeadlinePopover(false)}
                                                    className="text-xs font-extrabold text-[#ff6300] hover:text-orange-600 transition-colors"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setAssignedDate("-");
                                                        setShowDeadlinePopover(false);
                                                    }}
                                                    className="text-xs font-extrabold text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Attachments Section */}
                    {attachments.length > 0 && (
                        <div>
                            <h4 className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider mb-2">
                                Attachments ({attachments.length})
                            </h4>
                            <div className="space-y-2">
                                {attachments.map(att => (
                                    <div key={att.id} className="flex items-center gap-3 p-2.5 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl group transition-all hover:shadow-md">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${att.type === "link"
                                            ? "bg-purple-50 dark:bg-purple-900/20 text-purple-500"
                                            : "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                                            }`}>
                                            {att.type === "link" ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                                    <polyline points="10 9 9 9 8 9"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-bold truncate transition-colors ${att.type === "link" ? "text-gray-700 group-hover:text-purple-600" : "text-gray-700 group-hover:text-blue-600"
                                                }`}>
                                                {att.title}
                                            </p>
                                        </div>
                                        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-gray-400">
                                <svg width="16" height="10" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1H18M0 6H18M0 11H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h4 className="text-[11px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">Description</h4>
                        </div>
                        <textarea
                            className="w-full h-28 p-3 bg-[#f8fafc] dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs text-[#1e293b] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-200 resize-none transition-all placeholder:text-gray-400"
                            placeholder="Add a more detailed description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Checklists Section */}
                    {checklists.map(checklist => (
                        <div key={checklist.id} className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="text-gray-700 dark:text-gray-200">
                                        <CheckSquare size={18} />
                                    </div>
                                    <h4 className="text-sm font-extrabold text-[#111827] dark:text-gray-100">{checklist.title}</h4>
                                </div>
                                <button
                                    onClick={() => handleDeleteChecklist(checklist.id)}
                                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-gray-400 w-6">{calculateProgress(checklist.items)}%</span>
                                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-500"
                                        style={{ width: `${calculateProgress(checklist.items)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 pl-1">
                                {checklist.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 py-2 group/item">
                                        <button
                                            onClick={() => handleToggleChecklistItem(checklist.id, item.id)}
                                            className={`w-5 h-5 rounded border transition-all flex items-center justify-center shrink-0 ${item.isCompleted
                                                ? "bg-emerald-500 border-emerald-500"
                                                : "border-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                                }`}
                                        >
                                            {item.isCompleted && <Check size={12} className="text-white" strokeWidth={3} />}
                                        </button>
                                        <span className={`text-xs font-medium flex-1 ${item.isCompleted ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}>
                                            {item.title}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteChecklistItem(checklist.id, item.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}

                                {activeAddItemId === checklist.id ? (
                                    <div className="mt-2 space-y-3 p-1">
                                        <div className="flex gap-3">
                                            <div className="w-5 h-5 rounded border border-gray-200 dark:border-gray-600 mt-2 shrink-0" />
                                            <textarea
                                                className="w-full min-h-[80px] p-3 bg-white dark:bg-gray-900 border-2 border-orange-500 rounded-xl text-xs text-[#1e293b] dark:text-gray-300 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                                placeholder="Tambahkan detail item..."
                                                value={itemTitleInput}
                                                onChange={(e) => setItemTitleInput(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 pl-8">
                                            <button
                                                onClick={() => {
                                                    handleAddChecklistItem(checklist.id, itemTitleInput);
                                                    setItemTitleInput("");
                                                    setActiveAddItemId(null);
                                                }}
                                                className="px-6 py-2 bg-[#ff6300] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setActiveAddItemId(null);
                                                    setItemTitleInput("");
                                                }}
                                                className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 transition-colors"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pt-2">
                                        <button
                                            onClick={() => setActiveAddItemId(checklist.id)}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl transition-all active:scale-95"
                                        >
                                            Add an item
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-50 dark:border-gray-700/50 flex justify-end items-center gap-3 bg-white dark:bg-gray-800 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`min-w-[100px] flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-xl text-xs font-extrabold shadow-[0_4px_12px_rgba(249,115,22,0.15)] hover:bg-orange-600 hover:shadow-[0_6px_16px_rgba(249,115,22,0.2)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100`}
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Menyimpan..</span>
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                <span>Simpan</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function QuickButton({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`group flex items-center gap-2 px-3 py-1.5 border rounded-xl text-xs font-bold transition-all ${active
                ? "bg-orange-50 border-orange-200 text-orange-600 shadow-sm"
                : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-[#64748b] dark:text-gray-300 shadow-sm hover:bg-gray-50 hover:text-orange-500"
                }`}
        >
            <span className={`transition-colors ${active ? "text-orange-500" : "text-gray-400 group-hover:text-orange-500"}`}>
                {icon}
            </span>
            {label}
        </button>
    );
}
