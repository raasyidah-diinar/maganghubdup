"use client";

import { useState } from "react";
import { Search, Mail, Box, RotateCw, MoreVertical, Trash2, Star, Reply, Forward, User, Trash, Archive } from "lucide-react";

export default function InboxPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "SMKN 100 Jakarta",
            email: "info@smkn100jakarta.sch.id",
            date: "24 Feb 2026",
            subject: "Penarikan Siswa Praktik Kerja Lapangan (PKL)",
            isUnread: false,
            content: `Dengan hormat,
Sehubungan dengan telah berakhirnya masa Praktik Kerja Lapangan (PKL) bagi siswa kami di instansi Bapak/Ibu, maka bersama ini kami bermaksud untuk menarik kembali siswa-siswi kami yang telah melaksanakan praktik selama 3 (tiga) bulan di PT. Glints.
Adapun data siswa yang dimaksud adalah sebagai berikut:`,
            tableData: [
                { no: 1, nama: "Budi Santoso", nis: "12345678", kelas: "XII RPL 1" },
                { no: 2, nama: "Siti Aminah", nis: "87654321", kelas: "XII RPL 2" },
            ],
            closing: `Kami mengucapkan terima kasih yang sebesar-besarnya atas bimbingan, ilmu, dan kesempatan yang telah diberikan kepada siswa-siswi kami selama berada di lingkungan kerja Bapak/Ibu.
Demikian surat ini kami sampaikan, atas perhatian dan kerja samanya kami ucapkan terima kasih.`
        },
        {
            id: 2,
            sender: "SMKN 100 Jakarta",
            email: "admin@smkn100jakarta.sch.id",
            date: "23 Feb 2026",
            subject: "Undangan Diskusi Kolaborasi Partnership 2026",
            isUnread: true,
            content: "Kami mengundang perwakilan PT. Glints untuk hadir dalam acara diskusi kolaborasi tahunan...",
        },
        {
            id: 3,
            sender: "Gojek",
            email: "no-reply@gojek.com",
            date: "21 Feb 2026",
            subject: "Laporan Hasil Pembaruan Sistem v2.4",
            isUnread: false,
            content: "Berikut adalah rincian pembaruan sistem yang telah diimplementasikan pada hari ini...",
        },
        {
            id: 4,
            sender: "Ruangguru",
            email: "partnership@ruangguru.com",
            date: "20 Feb 2026",
            subject: "Pengajuan Proposal Program Magang Industri",
            isUnread: true,
            content: "Kami telah melampirkan proposal program magang untuk periode Semester Ganjil...",
        },
        {
            id: 5,
            sender: "Tokopedia",
            email: "billing@tokopedia.com",
            date: "18 Feb 2026",
            subject: "Invoice Tagihan Layanan Server Cloud - Februari 2026",
            isUnread: false,
            content: "Tagihan layanan cloud Anda untuk periode Februari telah diterbitkan, mohon segera melakukan pembayaran...",
        },
        {
            id: 6,
            sender: "Gojek",
            email: "security@gojek.com",
            date: "15 Feb 2026",
            subject: "Instruksi Wajib: Verifikasi Keamanan 2FA",
            isUnread: false,
            content: "Keamanan akun Anda adalah prioritas kami. Mohon aktifkan autentikasi dua faktor segera...",
        },
    ]);

    const handleSelectMessage = (id: number) => {
        setSelectedId(id);
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, isUnread: false } : msg
        ));
    };

    const filters = ["Semua", "Belum Dibaca", "Arsip"];

    const selectedMessage = messages.find(m => m.id === selectedId);

    return (
        <div className="flex h-full -ml-4 lg:-ml-6 -mt-4 lg:-mt-6 bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden divide-x divide-gray-100 dark:divide-gray-800">
            {/* Left Column: Message List Section */}
            <div className="w-[450px] flex flex-col bg-white dark:bg-gray-900 shrink-0 border-r border-gray-100 dark:border-gray-800">
                {/* Header & Filters */}
                <div className="p-7 pb-5">
                    <div className="flex flex-col gap-5 mb-6">
                        <h1 className="text-[20px] font-bold text-[#001D35] dark:text-white tracking-tight">Surat Masuk</h1>

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

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Cari email..."
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
                            onClick={() => handleSelectMessage(msg.id)}
                            className={`px-7 py-5 cursor-pointer transition-all border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 relative ${selectedId === msg.id ? "bg-[#F8FAFC] dark:bg-gray-800/50" : ""
                                }`}
                        >
                            {msg.isUnread && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            )}
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[13px] font-bold ${selectedId === msg.id ? "text-slate-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                                    {msg.sender}
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
                                            {selectedMessage.sender} <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">{"<"}{selectedMessage.email}{">"}</span>
                                        </h2>
                                        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-gray-200 mb-1">
                                            {selectedMessage.subject}
                                        </h3>
                                        <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">
                                            Ke: saya &nbsp; Reply-To: {selectedMessage.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap pt-1">
                                    {selectedMessage.date}
                                </div>
                            </div>

                            <div className="max-w-4xl border border-gray-100 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-sm">
                                <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                                    {selectedMessage.content}
                                </p>

                                {selectedMessage.tableData && (
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-8">
                                        <table className="w-full text-[12px] text-left border-collapse">
                                            <thead className="bg-[#F8FAFC] dark:bg-gray-800/50">
                                                <tr>
                                                    <th className="px-6 py-3 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">No</th>
                                                    <th className="px-6 py-3 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">Nama Siswa</th>
                                                    <th className="px-6 py-3 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">NIS</th>
                                                    <th className="px-6 py-3 font-bold text-gray-700 dark:text-gray-300">Kelas</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {selectedMessage.tableData.map((row) => (
                                                    <tr key={row.no}>
                                                        <td className="px-6 py-4 border-r border-gray-200 dark:border-gray-700 text-center">{row.no}</td>
                                                        <td className="px-6 py-4 border-r border-gray-200 dark:border-gray-700">{row.nama}</td>
                                                        <td className="px-6 py-4 border-r border-gray-200 dark:border-gray-700">{row.nis}</td>
                                                        <td className="px-6 py-4">{row.kelas}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {selectedMessage.closing}
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
