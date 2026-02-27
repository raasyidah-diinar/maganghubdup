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
    const [isMuted, setIsMuted] = useState(false);

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
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex overflow-hidden">

                        {/* LEFT COLUMN: Message List */}
                        <div className={`w-full md:w-[380px] border-r border-gray-100 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
                            {/* Header */}
                            <div className="p-6 pb-4 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-bold text-xl text-gray-900 dark:text-white">Inbox</h2>
                                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs px-2.5 py-1 rounded-full font-bold">
                                        {messages.filter(m => (m.unreadCount ?? 0) > 0).length}
                                    </span>
                                </div>
                                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                                    <button
                                        onClick={() => setFilterMode("all")}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterMode === "all"
                                            ? 'bg-white dark:bg-gray-600 shadow-sm text-[#E8532F]'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilterMode("unread")}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterMode === "unread"
                                            ? 'bg-white dark:bg-gray-600 shadow-sm text-[#E8532F]'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        Unread
                                    </button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="p-6 pt-4 pb-2 shrink-0">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Cari pesan, nama, atau perusahaan..."
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {filteredMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
                                        <Inbox className="w-12 h-12 text-gray-300 mb-3" />
                                        <p className="text-sm text-gray-500">Tidak ada pesan</p>
                                    </div>
                                ) : (
                                    filteredMessages.map((msg) => {
                                        const isUnread = (msg.unreadCount ?? 0) > 0;
                                        return (
                                            <div
                                                key={msg.id}
                                                onClick={() => handleSelectMessage(msg.id)}
                                                className={`p-6 py-5 border-b border-gray-50 dark:border-gray-700/50 cursor-pointer transition-all ${selectedMessageId === msg.id
                                                    ? 'bg-gray-50/50 dark:bg-gray-700/30'
                                                    : 'hover:bg-gray-50/30 dark:hover:bg-gray-700/20'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <h4 className="text-[14.5px] font-bold text-gray-900 dark:text-white truncate">
                                                            {msg.sender}
                                                        </h4>
                                                        {isUnread && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8532F] flex-shrink-0"></span>
                                                        )}
                                                    </div>
                                                    <span className="text-[11.5px] text-gray-400 shrink-0 ml-2">
                                                        {msg.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-start justify-between gap-3">
                                                    <p className={`text-[12.5px] line-clamp-1 flex-1 leading-snug ${isUnread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 font-normal'}`}>
                                                        {msg.preview}
                                                    </p>
                                                    {isUnread && (
                                                        <span className="shrink-0 bg-[#E8532F] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm shadow-orange-500/20">
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
                                    <div className="h-16 px-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between shrink-0 bg-white dark:bg-gray-800 shadow-none z-10">
                                        <div className="flex items-center gap-3">
                                            {/* Mobile Back Button */}
                                            <button onClick={() => setSelectedMessageId(null)} className="md:hidden p-1 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                                <ChevronLeft size={24} />
                                            </button>

                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700">
                                                    {selectedMessage.avatar ? (
                                                        <Image src={selectedMessage.avatar} alt={selectedMessage.sender} width={40} height={40} className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-50 text-sm">{selectedMessage.sender.charAt(0)}</div>
                                                    )}
                                                </div>
                                                {selectedMessage.isOnline && (
                                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-[14.5px] leading-tight">{selectedMessage.sender}</h3>
                                                <p className="text-[11.5px] text-gray-400 dark:text-gray-500">{selectedMessage.role || 'User'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconButton icon={<Phone size={18} />} />
                                            <IconButton icon={<Video size={18} />} />
                                            <div className="w-px h-6 bg-gray-100 dark:bg-gray-700 mx-2"></div>
                                            <IconButton icon={<Search size={18} />} />
                                            <IconButton icon={<MoreVertical size={18} />} />
                                        </div>
                                    </div>

                                    {/* Chat Messages */}
                                    <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900/50 space-y-6">
                                        <div className="flex justify-center">
                                            <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                Today
                                            </span>
                                        </div>

                                        {(selectedMessage.messages || []).map((msg) => (
                                            <div key={msg.id} className="space-y-1">
                                                <div className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${msg.sender === 'me'
                                                        ? 'bg-[#E8532F] text-white rounded-tr-none'
                                                        : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600'
                                                        }`}>
                                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                                    </div>
                                                </div>
                                                {msg.time && (
                                                    <div className={`flex ${msg.sender === 'me' ? 'justify-end pr-1' : 'justify-start pl-1'} text-[10px] text-gray-400`}>
                                                        {msg.time}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-6 pt-2 border-t border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
                                        <div className="bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 focus-within:ring-1 focus-within:ring-gray-200 transition-all">
                                            <textarea
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                placeholder={`Ketik pesan untuk ${selectedMessage.sender}...`}
                                                className="w-full bg-transparent border-none focus:ring-0 text-[14.5px] resize-none p-0 mb-4 max-h-32 text-gray-900 dark:text-white placeholder:text-gray-400"
                                                rows={2}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {/* Toggle Switch */}
                                                    <button
                                                        onClick={() => setIsMuted(!isMuted)}
                                                        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${isMuted ? 'bg-[#E8532F]' : 'bg-gray-200'}`}
                                                    >
                                                        <div
                                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${isMuted ? 'translate-x-4' : ''}`}
                                                        />
                                                    </button>
                                                    <span className="text-[13.5px] text-gray-500 font-medium">Mute thread</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button className="text-gray-400 hover:text-gray-600 p-2 transition-colors">
                                                        <Paperclip size={20} />
                                                    </button>
                                                    <button
                                                        onClick={handleSendMessage}
                                                        disabled={!inputText.trim()}
                                                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${inputText.trim()
                                                            ? 'bg-[#E8532F] text-white shadow-lg shadow-orange-500/20'
                                                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <span>Send</span>
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Empty State */
                                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800">
                                    <div className="w-28 h-28 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-8">
                                        <div className="w-14 h-14 text-gray-300 dark:text-gray-600 border-[3.5px] border-gray-200 dark:border-gray-600 rounded-2xl flex items-center justify-center relative shadow-sm">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-[3px] border-gray-200 dark:border-gray-600 rounded-full opacity-40"></div>
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-200 dark:bg-gray-600 rounded-full opacity-40"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Belum ada pesan dipilih</h3>
                                    <p className="max-w-[280px] text-gray-400 dark:text-gray-500 text-[14.5px] leading-relaxed">
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