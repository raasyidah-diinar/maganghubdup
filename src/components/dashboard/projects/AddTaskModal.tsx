"use client";

import { X, Paperclip, ListTodo, Calendar, Plus } from "lucide-react";
import { useState } from "react";

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentColumn: string;
    onSave: (taskData: any) => void;
}

export default function AddTaskModal({ isOpen, onClose, currentColumn, onSave }: AddTaskModalProps) {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState<"link" | "upload">("link");
    const [showAttachmentPopover, setShowAttachmentPopover] = useState(false);

    // Attachment States
    const [attachmentUrl, setAttachmentUrl] = useState("");
    const [attachmentTitle, setAttachmentTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");

    // Form States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [attachments, setAttachments] = useState<any[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setFileName(file.name); // Default name
        }
    };

    const handleAddAttachment = () => {
        if (activeTab === "link" && attachmentUrl) {
            setAttachments([...attachments, {
                id: `att-${Date.now()}`,
                type: "link",
                url: attachmentUrl,
                title: attachmentTitle || attachmentUrl
            }]);
            setAttachmentUrl("");
            setAttachmentTitle("");
        } else if (activeTab === "upload" && selectedFile) {
            // In a real app, upload logic here. For now, create object URL
            setAttachments([...attachments, {
                id: `att-${Date.now()}`,
                type: "file",
                url: URL.createObjectURL(selectedFile),
                title: fileName || selectedFile.name,
                originalFile: selectedFile // Keep reference if needed
            }]);
            setSelectedFile(null);
            setFileName("");
        }
        setShowAttachmentPopover(false);
    };

    const handleSave = () => {
        if (title.trim()) {
            onSave({
                title,
                description,
                attachments,
                column: currentColumn
            });
            onClose();
            // Reset form
            setTitle("");
            setDescription("");
            setAttachments([]);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0">
                    <input
                        type="text"
                        placeholder="Judul Tugas..."
                        className="text-xl font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 bg-transparent border-none focus:outline-none w-full mr-4"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar relative">
                    {/* Action Buttons */}
                    <div className="flex gap-3 relative z-20">
                        <div className="relative">
                            <ActionButton
                                icon={<Paperclip size={14} />}
                                label={`Lampiran ${attachments.length > 0 ? `(${attachments.length})` : ''}`}
                                onClick={() => setShowAttachmentPopover(!showAttachmentPopover)}
                                active={showAttachmentPopover || attachments.length > 0}
                            />

                            {/* Attachment Popover */}
                            {showAttachmentPopover && (
                                <div className="absolute top-10 left-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-1 z-30 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex border-b border-gray-100 dark:border-gray-700 mb-3">
                                        <button
                                            onClick={() => setActiveTab("link")}
                                            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === "link" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                                        >
                                            Link / Tautan
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("upload")}
                                            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === "upload" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>

                                    <div className="p-2 space-y-3">
                                        {activeTab === "link" ? (
                                            <>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">URL Tautan</label>
                                                    <input
                                                        type="text"
                                                        value={attachmentUrl}
                                                        onChange={(e) => setAttachmentUrl(e.target.value)}
                                                        placeholder="https://..."
                                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Judul Tautan (Opsional)</label>
                                                    <input
                                                        type="text"
                                                        value={attachmentTitle}
                                                        onChange={(e) => setAttachmentTitle(e.target.value)}
                                                        placeholder="Contoh: Desain Figma"
                                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-900/50"
                                                    >
                                                        {selectedFile ? (
                                                            <div className="text-center px-4">
                                                                <Paperclip size={24} className="mb-2 mx-auto text-orange-500" />
                                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-200 block truncate max-w-[200px]">{selectedFile.name}</span>
                                                                <span className="text-[10px] text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Paperclip size={24} className="mb-2" />
                                                                <span className="text-xs font-semibold">Klik untuk upload file</span>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Judul File (Opsional)</label>
                                                    <input
                                                        type="text"
                                                        value={fileName}
                                                        onChange={(e) => setFileName(e.target.value)}
                                                        placeholder="Contoh: Laporan Akhir"
                                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                        disabled={!selectedFile}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div className="flex justify-end gap-2 mt-4 pt-2">
                                            <button
                                                onClick={() => setShowAttachmentPopover(false)}
                                                className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={handleAddAttachment}
                                                className="px-4 py-1.5 bg-orange-400 text-white rounded-lg text-xs font-bold hover:bg-orange-500 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={activeTab === "link" ? !attachmentUrl : !selectedFile}
                                            >
                                                Insert
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <ActionButton icon={<ListTodo size={14} />} label="Checklist" />
                        <ActionButton icon={<Calendar size={14} />} label="Tanggal" />
                    </div>

                    {/* Status Dropdown */}
                    <div>
                        <div className="relative inline-block z-10">
                            <button className="flex items-center justify-between w-40 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                {currentColumn}
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-2">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Members */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Members</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-white dark:ring-gray-800 cursor-pointer hover:ring-orange-200 transition-all">
                                <img src="/martin.png" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                            <span className="text-lg">≡</span> Description
                        </label>
                        <textarea
                            placeholder="Add a more detailed description..."
                            className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none transition-all"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        {/* Attachments Preview */}
                        {attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-xs font-bold text-gray-500 uppercase">Attachments</h4>
                                {attachments.map(att => (
                                    <div key={att.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <Paperclip size={14} className="text-orange-500" />
                                        <a href={att.url} target="_blank" rel="noreferrer" className="hover:underline flex-1 truncate">{att.title}</a>
                                        <button
                                            onClick={() => setAttachments(attachments.filter(a => a.id !== att.id))}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-[#ffece6] text-[#E8532F] hover:bg-[#E8532F] hover:text-white rounded-lg text-sm font-bold transition-all shadow-sm"
                    >
                        Simpan Tugas
                    </button>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-bold transition-colors ${active
                ? "bg-orange-50 border-orange-200 text-orange-600"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
        >
            {icon}
            {label}
        </button>
    )
}
