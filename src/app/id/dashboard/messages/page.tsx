"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Search,
    PenSquare,
    File,
    Send,
    AlertCircle,
    Trash2,
    Archive,
    Users,
    Bell,
    Tag,
    Inbox,
    MoreVertical,
    Phone,
    Video,
    Smile,
    Paperclip,
    ChevronLeft
} from "lucide-react";

// Types
interface ChatMessage {
    id: string;
    text: string;
    sender: "me" | "them";
    time?: string;
}

interface Message {
    id: string;
    sender: string;
    role?: string;
    avatar?: string;
    time: string;
    preview: string;
    unreadCount?: number;
    isOnline?: boolean;
    messages?: ChatMessage[];
}

// Mock Data
const initialMessages: Message[] = [
    {
        id: "1",
        sender: "Budi Santoso",
        role: "Senior HRD • Glints",
        avatar: "/martin.png",
        time: "10:30",
        preview: "Selamat pagi, apakah Anda bersedia untuk teknikal tes besok?",
        unreadCount: 2,
        isOnline: true,
        messages: [
            { id: "m1", sender: "me", text: "Halo Pak Budi, pendaftaran saya untuk posisi Frontend sudah dikirim ya.", time: "10:15" },
            { id: "m2", sender: "them", text: "Halo Mas, berkas CV dan Portofolio sudah kami terima dan review.", time: "10:20" },
            { id: "m3", sender: "them", text: "Kualifikasi Anda cocok dengan kebutuhan kami.", time: "10:25" },
            { id: "m4", sender: "them", text: "Selamat pagi, apakah Anda bersedia untuk teknikal tes besok?", time: "10:30" },
        ]
    },
    {
        id: "2",
        sender: "Dr. Siti Aminah",
        role: "Kepala Laboratorium • Tokopedia",
        avatar: "/kazuha.png",
        time: "Kemarin",
        preview: "Terima kasih atas partisipasinya dalam webinar kemarin.",
        unreadCount: 0,
        isOnline: false,
        messages: [
            { id: "m1", sender: "them", text: "Selamat siang, berikut kami lampirkan link sertifikat webinar.", time: "09:00" },
            { id: "m2", sender: "me", text: "Baik Bu, sudah saya terima dan download. Terima kasih banyak.", time: "09:15" },
            { id: "m3", sender: "them", text: "Terima kasih atas partisipasinya dalam webinar kemarin. Ditunggu di event selanjutnya.", time: "09:20" },
        ]
    },
    {
        id: "3",
        sender: "Admin LPK",
        role: "Support",
        avatar: "/joshua.png",
        time: "Senin",
        preview: "Baik kak, pendaftaran bootcamp batch 5 sudah dibuka.",
        unreadCount: 5,
        isOnline: true,
        messages: [
            { id: "m1", sender: "me", text: "Halo, saya mau tanya tentang bootcamp batch 5", time: "14:00" },
            { id: "m2", sender: "them", text: "Halo kak! Ada yang bisa kami bantu?", time: "14:05" },
            { id: "m3", sender: "me", text: "Kapan pendaftaran batch 5 dibuka?", time: "14:10" },
            { id: "m4", sender: "them", text: "Baik kak, pendaftaran bootcamp batch 5 sudah dibuka.", time: "14:15" },
            { id: "m5", sender: "them", text: "Untuk informasi lebih lengkap bisa cek website kami ya kak.", time: "14:16" },
        ]
    },
    {
        id: "4",
        sender: "Rani Wijaya",
        role: "Recruiter • Gojek",
        avatar: "/rei.png",
        time: "Minggu Lalu",
        preview: "Sama-sama, sukses untuk karir kedepannya.",
        unreadCount: 0,
        isOnline: false,
        messages: [
            { id: "m1", sender: "them", text: "Halo, saya dari tim rekrutmen Gojek.", time: "10:00" },
            { id: "m2", sender: "them", text: "Apakah Anda berminat untuk posisi Backend Engineer?", time: "10:01" },
            { id: "m3", sender: "me", text: "Halo! Wah, tentu saja saya tertarik.", time: "10:30" },
            { id: "m4", sender: "them", text: "Silakan kirim CV terbaru Anda ke email kami ya.", time: "10:35" },
            { id: "m5", sender: "me", text: "Baik, sudah saya kirim. Terima kasih!", time: "11:00" },
            { id: "m6", sender: "them", text: "Sama-sama, sukses untuk karir kedepannya.", time: "11:05" },
        ]
    }
];

export default function MessagesPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputText, setInputText] = useState("");
    const [filterMode, setFilterMode] = useState<"all" | "unread">("all");

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

    const selectedMessage = messages.find(m => m.id === selectedMessageId);

    // Filter messages based on mode
    const filteredMessages = filterMode === "unread"
        ? messages.filter(m => m.unreadCount && m.unreadCount > 0)
        : messages;

    // Count total unread
    const totalUnread = messages.reduce((acc, msg) => acc + (msg.unreadCount || 0), 0);

    const handleSelectMessage = (id: string) => {
        setSelectedMessageId(id);

        // Mark as read (remove unread count)
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, unreadCount: 0 } : msg
        ));
    };

    const handleSendMessage = () => {
        if (!inputText.trim() || !selectedMessageId) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedMessages = messages.map(msg => {
            if (msg.id === selectedMessageId) {
                return {
                    ...msg,
                    messages: [...(msg.messages || []), newMessage],
                    preview: inputText,
                    time: newMessage.time || "Baru saja"
                };
            }
            return msg;
        });

        setMessages(updatedMessages);
        setInputText("");
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

                <main className="flex-1 overflow-hidden p-4 md:p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-full flex overflow-hidden">

                        {/* LEFT COLUMN: Navigation (Hidden on mobile if chat selected) */}
                        <div className={`w-full md:w-64 border-r border-gray-100 dark:border-gray-700 flex flex-col ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#E8532F] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                                        <Inbox size={18} />
                                    </div>
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Kotak Pesan</h2>
                                </div>

                                <button className="w-full bg-[#E8532F] hover:bg-[#d64522] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors mb-6 shadow-md shadow-orange-500/20 group">
                                    <PenSquare size={18} className="group-hover:scale-110 transition-transform" />
                                    <span>Pesan Baru</span>
                                    {totalUnread > 0 && (
                                        <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                                            {totalUnread}
                                        </span>
                                    )}
                                </button>

                                <div className="space-y-1">
                                    <NavItem icon={<Inbox size={18} />} label="Inbox" count={filteredMessages.length} active />
                                    <NavItem icon={<File size={18} />} label="Drafts" count={2} />
                                    <NavItem icon={<Send size={18} />} label="Sent" />
                                    <NavItem icon={<AlertCircle size={18} />} label="Junk" count={5} />
                                    <NavItem icon={<Trash2 size={18} />} label="Trash" />
                                    <NavItem icon={<Archive size={18} />} label="Archive" />
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">Labels</h3>
                                    <div className="space-y-1">
                                        <NavItem icon={<Users size={18} className="text-blue-500" />} label="Social" count={12} />
                                        <NavItem icon={<Bell size={18} className="text-yellow-500" />} label="Updates" count={4} />
                                        <NavItem icon={<Tag size={18} className="text-purple-500" />} label="Promotions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE COLUMN: Message List (Hidden on mobile if chat selected) */}
                        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Inbox</h2>
                                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
                                        {filteredMessages.length}
                                    </span>
                                </div>
                                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
                                    <button
                                        onClick={() => setFilterMode("all")}
                                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filterMode === "all"
                                                ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white'
                                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilterMode("unread")}
                                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filterMode === "unread"
                                                ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white'
                                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        Unread
                                    </button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="p-4 pt-2 shrink-0">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E8532F] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Cari pesan, nama, atau perusahaan..."
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {filteredMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                                            <Inbox className="w-8 h-8 text-gray-300 dark:text-gray-500" />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada pesan unread</p>
                                    </div>
                                ) : (
                                    filteredMessages.map((msg) => {
                                        const isUnread = (msg.unreadCount ?? 0) > 0;
                                        return (
                                            <div
                                                key={msg.id}
                                                onClick={() => handleSelectMessage(msg.id)}
                                                className={`p-4 border-b border-gray-50 dark:border-gray-700/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedMessageId === msg.id ? 'bg-orange-50 dark:bg-orange-900/10 border-l-2 border-l-[#E8532F]' : 'border-l-2 border-l-transparent'}`}
                                            >
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <h4 className={`text-sm truncate ${isUnread ? 'font-bold text-gray-900 dark:text-white' : 'font-normal text-gray-700 dark:text-gray-200'}`}>
                                                            {msg.sender}
                                                        </h4>
                                                        {isUnread && (
                                                            <span className="w-2 h-2 rounded-full bg-[#E8532F] flex-shrink-0"></span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                                        <span className={`text-xs ${isUnread ? 'text-[#E8532F] font-medium' : 'text-gray-400'}`}>
                                                            {msg.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className={`text-xs line-clamp-2 flex-1 ${isUnread ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                                                        {msg.preview}
                                                    </p>
                                                    {isUnread && (
                                                        <span className="flex-shrink-0 bg-[#E8532F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                                            {msg.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Chat View / Empty State */}
                        <div className={`flex-1 flex flex-col bg-white dark:bg-gray-800 border-l border-gray-100 dark:border-gray-700 ${!selectedMessageId ? 'hidden md:flex' : 'flex fixed inset-0 z-50 md:static md:z-auto bg-white'}`}>
                            {selectedMessage ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="h-16 px-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0 bg-white dark:bg-gray-800 shadow-sm z-10">
                                        <div className="flex items-center gap-3">
                                            {/* Mobile Back Button */}
                                            <button onClick={() => setSelectedMessageId(null)} className="md:hidden p-1 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                                <ChevronLeft size={24} />
                                            </button>

                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                                                    {selectedMessage.avatar ? (
                                                        <Image src={selectedMessage.avatar} alt={selectedMessage.sender} width={40} height={40} className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-gray-100">{selectedMessage.sender.charAt(0)}</div>
                                                    )}
                                                </div>
                                                {selectedMessage.isOnline && (
                                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full ring-1 ring-white dark:ring-gray-800"></span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{selectedMessage.sender}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedMessage.role || 'User'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconButton icon={<Phone size={18} />} />
                                            <IconButton icon={<Video size={18} />} />
                                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
                                            <IconButton icon={<Search size={18} />} />
                                            <IconButton icon={<MoreVertical size={18} />} />
                                        </div>
                                    </div>

                                    {/* Chat Messages */}
                                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 dark:bg-gray-900/50 space-y-6">
                                        <div className="flex justify-center">
                                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                Started 09:00
                                            </span>
                                        </div>

                                        {(selectedMessage.messages || []).map((msg) => (
                                            <div key={msg.id} className="space-y-1">
                                                <div className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                    {msg.sender === 'them' && (
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 mb-1">
                                                            {selectedMessage.avatar ? (
                                                                <Image src={selectedMessage.avatar} alt={selectedMessage.sender} width={24} height={24} className="object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">{selectedMessage.sender.charAt(0)}</div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-3.5 shadow-sm ${msg.sender === 'me'
                                                        ? 'bg-[#E8532F] text-white rounded-tr-none'
                                                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600'
                                                        }`}>
                                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                                    </div>
                                                </div>
                                                {msg.time && (
                                                    <div className={`flex ${msg.sender === 'me' ? 'justify-end pr-1' : 'justify-start pl-9'} text-[10px] text-gray-400`}>
                                                        {msg.time}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
                                        <div className="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#E8532F]/20 focus-within:border-[#E8532F] transition-all shadow-sm">
                                            <textarea
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                placeholder={`Ketik pesan untuk ${selectedMessage.sender}...`}
                                                className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none p-2 max-h-32 text-gray-900 dark:text-white placeholder:text-gray-400"
                                                rows={1}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                            <div className="flex items-center justify-between px-2 pb-1 pt-1">
                                                <div className="flex gap-2 text-gray-400">
                                                    <button className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 p-1 rounded-full"><Paperclip size={18} /></button>
                                                    <button className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 p-1 rounded-full"><Smile size={18} /></button>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 text-gray-400 mr-2 cursor-pointer hover:text-gray-600 transition-colors">
                                                        <span className="text-xs font-medium">Mute thread</span>
                                                        <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                                                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleSendMessage}
                                                        disabled={!inputText.trim()}
                                                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${inputText.trim()
                                                            ? 'bg-[#E8532F] text-white shadow-md shadow-orange-500/20 hover:bg-[#d64522] hover:shadow-orange-500/30'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <span>Send</span>
                                                        <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Empty State */
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <Inbox className="w-10 h-10 text-gray-300 dark:text-gray-500" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Belum ada pesan dipilih</h3>
                                    <p className="max-w-xs text-sm text-gray-400">
                                        Pilih salah satu percakapan dari daftar di sebelah kiri untuk mulai membaca.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, count, active }: { icon: React.ReactNode, label: string, count?: number, active?: boolean }) {
    return (
        <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${active
            ? "bg-orange-50 dark:bg-orange-900/10 text-[#E8532F] font-bold"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            }`}>
            <div className="flex items-center gap-3">
                <span className={`${active ? "text-[#E8532F]" : "group-hover:text-gray-900 dark:group-hover:text-white"} transition-colors`}>{icon}</span>
                <span className={`text-sm ${active ? "text-[#E8532F]" : "group-hover:text-gray-900 dark:group-hover:text-white"} transition-colors`}>{label}</span>
            </div>
            {count !== undefined && count > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active
                    ? "bg-[#E8532F]/10 text-[#E8532F]"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}>
                    {count}
                </span>
            )}
        </button>
    )
}

function IconButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
            {icon}
        </button>
    )
}