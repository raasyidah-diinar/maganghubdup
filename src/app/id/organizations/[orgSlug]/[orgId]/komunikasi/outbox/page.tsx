"use client";

import { useState } from "react";
import { Search, Mail, Box, RotateCw, MoreVertical, Plus, Send, Trash2, Star, User, Reply, Forward, Trash, Archive } from "lucide-react";
import ComposeFlow from "@/components/komunikasi/ComposeFlow";

export default function OutboxPage() {
    const [isComposing, setIsComposing] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const filters = ["Semua", "Belum Dibuka", "Arsip"];

    const messages = [
        {
            id: 1,
            recipient: "Glints",
            email: "partnership@glints.com",
            date: "23 Feb 2026",
            subject: "Konfirmasi Kehadiran Diskusi Partnership 2026",
            content: `Halo Tim Glints,

Kami dengan senang hati mengonfirmasi kehadiran kami dalam diskusi kolaborasi partnership yang dijadwalkan pada hari Jumat mendatang. Kami sangat antusias untuk membahas potensi kerja sama lebih lanjut.

Terima kasih,
Tim MagangHub`,
        },
        {
            id: 2,
            recipient: "Glints",
            email: "support@glints.com",
            date: "24 Feb 2026",
            subject: "Permohonan Penambahan Kapasitas Penyimpanan Cloud",
            content: `Kepada Tim Support,

Sehubungan dengan meningkatnya jumlah data pengguna di platform kami, kami ingin mengajukan penambahan kapasitas penyimpanan cloud sebesar 500GB for server utama kami.

Mohon informasi terkait rincian biaya and prosedurnya.`,
        },
        {
            id: 3,
            recipient: "Glints",
            email: "hr@glints.com",
            date: "22 Feb 2026",
            subject: "Persetujuan Penerimaan Program Magang Mahasiswa",
            content: `Selamat siang,

Berdasarkan hasil seleksi administratif, kami telah menyetujui daftar mahasiswa terlampir for mengikuti program magang di PT. Glints for periode tahun 2026.

Silakan hubungi kami jika ada dokumen tambahan yang diperlukan.`,
        },
    ];

    const selectedMessage = messages.find(m => m.id === selectedId);

    if (isComposing) {
        return (
            <div className="h-full bg-white dark:bg-gray-900 overflow-y-auto custom-scrollbar -ml-4 lg:-ml-6 -mt-4 lg:-mt-6">
                <ComposeFlow onBack={() => setIsComposing(false)} />
            </div>
        );
    }

    return (
        <div className="flex h-full -ml-4 lg:-ml-6 -mt-4 lg:-mt-6 bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden divide-x divide-gray-100 dark:divide-gray-800">
            {/* Left Column: Message List Section */}
            <div className="w-[450px] flex flex-col bg-white dark:bg-gray-900 shrink-0 border-r border-gray-100 dark:border-gray-800">
                {/* Header & Filters */}
                <div className="p-7 pb-5">
                    <div className="flex flex-col gap-5 mb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-[20px] font-bold text-[#001D35] dark:text-white tracking-tight">Surat Keluar</h1>
                            <button
                                onClick={() => setIsComposing(true)}
                                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-gray-400 hover:text-[#FF7A00] hover:border-orange-100 dark:hover:border-orange-900/30 transition-all shadow-sm active:scale-95"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {/* Filter Pill Container */}
                        <div className="flex bg-[#F1F4F7] dark:bg-gray-800/80 p-1 rounded-xl w-full">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex-1 px-4 py-1.5 rounded-lg text-[12px] transition-all duration-300 ${activeFilter === filter
                                        ? "bg-white dark:bg-gray-700 text-[#001D35] dark:text-white font-semibold shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]"
                                        : "text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Cari surat terkirim..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-[#F1F4F7] dark:bg-gray-800/50 border-none rounded-2xl text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700/50 transition-all font-medium placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Message List Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar border-t border-gray-100 dark:border-gray-800">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedId(msg.id)}
                            className={`px-7 py-5 cursor-pointer transition-all border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 relative ${selectedId === msg.id ? "bg-[#F8FAFC] dark:bg-gray-800/50" : ""
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[13px] font-bold ${selectedId === msg.id ? "text-slate-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                                    {msg.recipient}
                                </span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                                    {msg.date}
                                </span>
                            </div>
                            <p className={`text-[12px] line-clamp-1 leading-relaxed ${selectedId === msg.id ? "text-slate-600 dark:text-gray-300 font-semibold" : "text-gray-500 dark:text-gray-400"}`}>
                                {msg.subject}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Message Preview Section */}
            <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col relative overflow-hidden">
                {selectedMessage ? (
                    <>
                        {/* Detail Header Toolbar */}
                        <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                                    <Archive size={18} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                                <div className="w-px h-6 bg-gray-100 dark:bg-gray-800" />
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                                    <Star size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Message Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                            <div className="flex items-start justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-[16px] font-bold text-[#001D35] dark:text-white mb-1 flex items-center gap-2">
                                            {selectedMessage.recipient} <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">{"<"}{selectedMessage.email}{">"}</span>
                                        </h2>
                                        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-gray-200 mb-1">
                                            {selectedMessage.subject}
                                        </h3>
                                        <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">
                                            Dari: saya &nbsp; Reply-To: admin@maganghub.id
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap pt-1">
                                    {selectedMessage.date}
                                </div>
                            </div>

                            <div className="max-w-4xl border border-gray-100 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-sm">
                                <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {selectedMessage.content}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-8">
                                <button className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                                    <Reply size={16} /> Balas
                                </button>
                                <button className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                                    <Forward size={16} /> Teruskan
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                        <p className="text-[15px] font-medium text-gray-300 dark:text-gray-600 tracking-tight">
                            Pilih pesan untuk dibaca
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
