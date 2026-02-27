"use client";

import { X, Paperclip, ListTodo, Calendar, Plus, Check } from "lucide-react";
import { useState, useRef } from "react";

const BOARD_MEMBERS = [
    { id: 'm1', name: 'Daffa Aziz Ghiffari', avatar: '/martin.png' },
    { id: 'm2', name: 'Fatkul Amri', avatar: '/martin.png' },
    { id: 'm3', name: 'Fajar Wati', avatar: '/martin.png' },
    { id: 'm4', name: 'Salsabila Putri', avatar: '/martin.png' },
    { id: 'm5', name: 'Aditya Pratama', avatar: '/martin.png' },
];

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

    // Checklist States
    const [showChecklistPopover, setShowChecklistPopover] = useState(false);
    const [checklistTitle, setChecklistTitle] = useState("Checklist");
    const [checklists, setChecklists] = useState<{ id: string; title: string; items: { id: string; text: string; checked: boolean }[] }[]>([]);
    const [addingItemToId, setAddingItemToId] = useState<string | null>(null);
    const [newItemText, setNewItemText] = useState("");

    // Members State
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['m1']);

    // Date States
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [calViewDate, setCalViewDate] = useState(new Date());
    const [datePickerPos, setDatePickerPos] = useState({ top: 0, left: 0 });
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleOpenDatePicker = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDatePickerPos({ top: rect.bottom + 4, left: rect.left });
        setShowDatePicker(!showDatePicker);
    };

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

    const handleAddChecklist = () => {
        if (checklistTitle.trim()) {
            setChecklists([...checklists, { id: `cl-${Date.now()}`, title: checklistTitle.trim(), items: [] }]);
            setChecklistTitle("Checklist");
            setShowChecklistPopover(false);
        }
    };

    const handleAddItemToChecklist = (checklistId: string) => {
        if (newItemText.trim()) {
            setChecklists(checklists.map(cl => cl.id === checklistId
                ? { ...cl, items: [...cl.items, { id: `item-${Date.now()}`, text: newItemText.trim(), checked: false }] }
                : cl
            ));
            setNewItemText("");
            setAddingItemToId(null);
        }
    };

    const handleToggleItem = (checklistId: string, itemId: string) => {
        setChecklists(checklists.map(cl => cl.id === checklistId
            ? { ...cl, items: cl.items.map(it => it.id === itemId ? { ...it, checked: !it.checked } : it) }
            : cl
        ));
    };

    const handleDeleteChecklist = (checklistId: string) => {
        setChecklists(checklists.filter(cl => cl.id !== checklistId));
    };

    const handleSave = () => {
        if (title.trim()) {
            onSave({
                title,
                description,
                attachments,
                column: currentColumn,
                checklists,
                date: selectedDate,
                members: selectedMemberIds,
            });
            onClose();
            // Reset form
            setTitle("");
            setDescription("");
            setAttachments([]);
            setChecklists([]);
            setSelectedDate("");
            setSelectedMemberIds(['m1']);
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

                        <div className="relative">
                            <ActionButton
                                icon={<ListTodo size={14} />}
                                label="Checklist"
                                onClick={() => setShowChecklistPopover(!showChecklistPopover)}
                                active={showChecklistPopover || checklists.length > 0}
                            />
                            {showChecklistPopover && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setShowChecklistPopover(false)}></div>
                                    <div className="absolute top-10 left-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-30 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-sm font-bold text-center text-gray-700 dark:text-gray-200">Add Checklist</p>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div>
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1 block">Title</label>
                                                <input
                                                    type="text"
                                                    value={checklistTitle}
                                                    onChange={(e) => setChecklistTitle(e.target.value)}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddChecklist(); }}
                                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                    autoFocus
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1 block">Copy From... (Optional)</label>
                                                <div className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-400 flex items-center justify-between cursor-pointer">
                                                    <span>Select a checklist...</span>
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-1">
                                                <button
                                                    onClick={handleAddChecklist}
                                                    className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="relative">
                            <ActionButton
                                icon={<Calendar size={14} />}
                                label={selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "Tanggal"}
                                onClick={handleOpenDatePicker}
                                active={showDatePicker || !!selectedDate}
                            />
                            {showDatePicker && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowDatePicker(false)}></div>
                                    <div ref={datePickerRef} className="fixed bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-in fade-in zoom-in-95 duration-200 w-[280px]" style={{ top: datePickerPos.top, left: datePickerPos.left }}>
                                        {/* Month Nav */}
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={() => setCalViewDate(new Date(calViewDate.getFullYear(), calViewDate.getMonth() - 1, 1))}
                                                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                                            >
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                                                {calViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                            <button
                                                onClick={() => setCalViewDate(new Date(calViewDate.getFullYear(), calViewDate.getMonth() + 1, 1))}
                                                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                                            >
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                        </div>
                                        {/* Day Headers */}
                                        <div className="grid grid-cols-7 mb-1">
                                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                                <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>
                                            ))}
                                        </div>
                                        {/* Day Grid */}
                                        <div className="grid grid-cols-7">
                                            {(() => {
                                                const year = calViewDate.getFullYear();
                                                const month = calViewDate.getMonth();
                                                const firstDay = new Date(year, month, 1).getDay();
                                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                                const today = new Date();
                                                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                                                const cells: React.ReactElement[] = [];
                                                for (let i = 0; i < firstDay; i++) {
                                                    cells.push(<div key={`empty-${i}`} />);
                                                }
                                                for (let d = 1; d <= daysInMonth; d++) {
                                                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                                                    const isToday = dateStr === todayStr;
                                                    const isSelected = dateStr === selectedDate;
                                                    cells.push(
                                                        <button
                                                            key={d}
                                                            onClick={() => { setSelectedDate(dateStr); setShowDatePicker(false); }}
                                                            className={`text-center text-sm py-1.5 rounded-full mx-auto w-8 h-8 flex items-center justify-center transition-colors ${isSelected ? 'bg-gray-800 text-white font-bold' :
                                                                isToday ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold' :
                                                                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                                }`}
                                                        >
                                                            {d}
                                                        </button>
                                                    );
                                                }
                                                return cells;
                                            })()}
                                        </div>
                                        {selectedDate && (
                                            <button onClick={() => { setSelectedDate(""); setShowDatePicker(false); }} className="mt-3 w-full text-xs text-red-500 hover:text-red-700 font-semibold py-1 border-t border-gray-100 dark:border-gray-700 pt-2">
                                                Hapus Tanggal
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status Dropdown */}
                    <StatusDropdown initialColumn={currentColumn} />


                    {/* Members */}
                    <MembersSection
                        selectedMemberIds={selectedMemberIds}
                        setSelectedMemberIds={setSelectedMemberIds}
                    />

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

                        {/* Checklists - shown below description */}
                        {checklists.map(cl => {
                            const doneCount = cl.items.filter(i => i.checked).length;
                            const totalCount = cl.items.length;
                            const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
                            return (
                                <div key={cl.id} className="mt-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                            <ListTodo size={14} className="text-gray-500" />
                                            {cl.title}
                                        </h4>
                                        <button onClick={() => handleDeleteChecklist(cl.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">Delete</button>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-400">{progress}%</span>
                                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>
                                    {cl.items.length > 0 && (
                                        <div className="mb-2 space-y-1">
                                            {cl.items.map(item => (
                                                <div key={item.id} className="flex items-center gap-2 py-1.5 px-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
                                                    <button
                                                        onClick={() => handleToggleItem(cl.id, item.id)}
                                                        className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 hover:border-orange-400'
                                                            }`}
                                                    >
                                                        {item.checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                                    </button>
                                                    <span className={`text-sm flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>{item.text}</span>
                                                    <button onClick={() => setChecklists(checklists.map(c => c.id === cl.id ? { ...c, items: c.items.filter(i => i.id !== item.id) } : c))} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all">
                                                        <X size={13} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {addingItemToId === cl.id ? (
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                type="text"
                                                placeholder="Item baru..."
                                                value={newItemText}
                                                onChange={(e) => setNewItemText(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handleAddItemToChecklist(cl.id); if (e.key === 'Escape') { setAddingItemToId(null); setNewItemText(""); } }}
                                                autoFocus
                                                className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                            />
                                            <button onClick={() => handleAddItemToChecklist(cl.id)} className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">Add</button>
                                            <button onClick={() => { setAddingItemToId(null); setNewItemText(""); }} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 text-xs">Batal</button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setAddingItemToId(cl.id)}
                                            className="mt-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Add an item
                                        </button>
                                    )}
                                </div>
                            );
                        })}
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

function ActionButton({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, active?: boolean }) {
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

const STATUS_OPTIONS = [
    { value: 'BACKLOG', label: 'Backlog' },
    { value: 'TODO', label: 'To Do' },
    { value: 'DOING', label: 'Doing' },
    { value: 'IN REVIEW', label: 'In Review' },
    { value: 'DONE', label: 'Done' },
];

function StatusDropdown({ initialColumn }: { initialColumn: string }) {
    const [selected, setSelected] = useState(initialColumn);
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ top: rect.bottom + 4, left: rect.left });
        setOpen(!open);
    };

    const label = STATUS_OPTIONS.find(o => o.value === selected)?.label ?? selected;

    return (
        <>
            <button
                onClick={handleOpen}
                className="flex items-center gap-2 w-40 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <span className="flex-1 text-left">{label.toUpperCase()}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="fixed z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 w-44 animate-in fade-in zoom-in-95 duration-150" style={{ top: pos.top, left: pos.left }}>
                        {STATUS_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => { setSelected(opt.value); setOpen(false); }}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <span className={selected === opt.value ? 'font-semibold' : ''}>{opt.label}</span>
                                {selected === opt.value && (
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

function MembersSection({
    selectedMemberIds,
    setSelectedMemberIds
}: {
    selectedMemberIds: string[],
    setSelectedMemberIds: (ids: string[]) => void
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ top: rect.bottom + 4, left: rect.left });
        setOpen(!open);
    };

    const selectedMembers = BOARD_MEMBERS.filter(m => selectedMemberIds.includes(m.id));
    const availableMembers = BOARD_MEMBERS.filter(m =>
        !selectedMemberIds.includes(m.id) &&
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleMember = (id: string) => {
        if (selectedMemberIds.includes(id)) {
            setSelectedMemberIds(selectedMemberIds.filter(mid => mid !== id));
        } else {
            setSelectedMemberIds([...selectedMemberIds, id]);
        }
    };

    return (
        <div>
            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Members</h4>
            <div className="flex items-center gap-2">
                {selectedMembers.map(m => (
                    <div key={m.id} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-white dark:ring-gray-800 cursor-pointer hover:ring-orange-200 transition-all">
                        <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                ))}
                <button
                    onClick={handleOpen}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                    <Plus size={16} />
                </button>
            </div>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="fixed z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 w-72 animate-in fade-in zoom-in-95 duration-200 overflow-hidden" style={{ top: pos.top, left: pos.left }}>
                        <div className="p-3 text-center border-b border-gray-100 dark:border-gray-700">
                            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-200">Members</h5>
                        </div>
                        <div className="p-3 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search members"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                />
                            </div>

                            {selectedMembers.length > 0 && (
                                <div>
                                    <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Card Members</h6>
                                    <div className="space-y-1">
                                        {selectedMembers.map(m => (
                                            <div key={m.id} className="flex items-center justify-between p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg group">
                                                <div className="flex items-center gap-2">
                                                    <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-200">{m.name}</span>
                                                </div>
                                                <button onClick={() => toggleMember(m.id)} className="text-gray-400 hover:text-red-500">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Board Members</h6>
                                <div className="space-y-1">
                                    {availableMembers.map(m => (
                                        <button
                                            key={m.id}
                                            onClick={() => toggleMember(m.id)}
                                            className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left"
                                        >
                                            <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                                            <span className="text-sm text-gray-700 dark:text-gray-200">{m.name}</span>
                                        </button>
                                    ))}
                                    {availableMembers.length === 0 && (
                                        <p className="text-xs text-center text-gray-400 py-2">No members found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
