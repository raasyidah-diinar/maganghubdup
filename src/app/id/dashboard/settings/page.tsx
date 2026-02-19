"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    User,
    Lock,
    Bell,
    Upload,
    Trash2,
    MapPin,
    Globe,
    ChevronLeft,
    CheckCircle2,
    Mail,
    Smartphone,
    Eye,
    EyeOff,
    AlertCircle
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        name: "Raasyidah Diinar Kaamilah",
        position: "Technical Unity Game Developer",
        bio: "Mahasiswa Teknik Informatika tahun ke-3 dengan spesialisasi pengembangan Game Engine Unity. Berpengalaman dalam membangun mekanik gameplay yang kompleks, optimasi performa pada perangkat mobile, serta pengembangan teknologi imersif (AR/VR). Memiliki antusiasme tinggi pada Clean Code (C#), Design Patterns, dan integrasi Artificial Intelligence dalam game. Terbiasa bekerja dalam tim dengan metodologi Agile/Scrum.",
        location: "Malang",
        website: "",
        avatar: "/hyein.png"
    });

    const [notificationSettings, setNotificationSettings] = useState({
        submissionStatus: true,
        chatMessages: true,
        newsletter: true
    });

    const [avatarPreview, setAvatarPreview] = useState(formData.avatar);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setAvatarPreview("");
        setFormData(prev => ({ ...prev, avatar: "" }));
    };

    const handleSave = () => {
        console.log("Saving changes:", formData);
        alert("Perubahan berhasil disimpan!");
    };

    const tabs = [
        { id: "profile", label: "Profil Umum", desc: "Foto, Nama, Bio", icon: <User size={20} /> },
        { id: "account", label: "Akun & Keamanan", desc: "Email, Password", icon: <Lock size={20} /> },
        { id: "notifications", label: "Notifikasi", desc: "Email & Push", icon: <Bell size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-y-auto pb-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white">Pengaturan Akun</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola informasi profil dan preferensi akun Anda.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
                            {/* Left Sidebar - Tabs */}
                            <div className="space-y-4 lg:sticky lg:top-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 p-5 rounded-[24px] transition-all border ${activeTab === tab.id
                                            ? "bg-white border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
                                            : "bg-transparent border-transparent hover:bg-white/50 hover:border-gray-100 dark:hover:bg-gray-800/30"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-2xl ${activeTab === tab.id
                                            ? "bg-orange-50 text-[#E8532F] dark:bg-orange-950/20"
                                            : "bg-gray-100 text-gray-400 dark:bg-gray-700"
                                            }`}>
                                            {tab.icon}
                                        </div>
                                        <div className="text-left">
                                            <p className={`text-[15px] font-bold ${activeTab === tab.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                                                {tab.label}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {tab.desc}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Right Content - Form */}
                            <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                                <div className="p-8 flex-1">
                                    {activeTab === "profile" ? (
                                        <>
                                            <h2 className="text-lg font-bold text-[#1E293B] dark:text-white mb-1">Informasi Publik</h2>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 font-medium">Informasi ini akan ditampilkan di halaman profil publik Anda.</p>

                                            <hr className="border-gray-100 dark:border-gray-700 mb-8" />

                                            {/* Profile Photo */}
                                            <div className="flex items-center gap-8 mb-10">
                                                <div className="relative">
                                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-xl relative">
                                                        {avatarPreview ? (
                                                            <Image src={avatarPreview} alt="Avatar" fill sizes="120px" className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                <User size={48} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="absolute bottom-0 right-0 p-2.5 bg-[#E8532F] text-white rounded-full border-[3px] border-white dark:border-gray-800 shadow-lg hover:bg-[#d44828] transition-all active:scale-90 z-20 translate-x-1 translate-y-1"
                                                    >
                                                        <Upload size={18} />
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Foto Profil</h3>
                                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-4 font-medium">Disarankan gambar 400x400px. Max 2MB.</p>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors"
                                                        >
                                                            Ganti Foto
                                                        </button>
                                                        <button
                                                            onClick={handleDeleteImage}
                                                            className="text-xs font-bold text-[#FF4B4B] hover:underline px-2"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                        placeholder="Masukkan nama lengkap"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Posisi</label>
                                                    <input
                                                        type="text"
                                                        value={formData.position}
                                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                        placeholder="Contoh: Technical Unity Game Developer"
                                                    />
                                                </div>

                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Bio Singkat</label>
                                                        <span className="text-[10px] text-gray-400 font-medium">{formData.bio.length} / 500 karakter</span>
                                                    </div>
                                                    <textarea
                                                        rows={4}
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium resize-none leading-relaxed"
                                                        placeholder="Ceritakan sedikit tentang dirimu..."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Lokasi (Kota)</label>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                            <input
                                                                type="text"
                                                                value={formData.location}
                                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                                placeholder="Contoh: Sleman, Yogyakarta"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Website / Portfolio</label>
                                                        <div className="relative">
                                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                            <input
                                                                type="text"
                                                                value={formData.website}
                                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                                placeholder="https://yourportfolio.com"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : activeTab === "account" ? (
                                        <>
                                            <h2 className="text-lg font-bold text-[#1E293B] dark:text-white mb-1">Akun & Keamanan</h2>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 font-medium">Kelola login dan keamanan akun Anda.</p>

                                            <hr className="border-gray-100 dark:border-gray-700 mb-8" />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Alamat Email</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                            <Mail size={18} />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            defaultValue="diinar@gmail.com"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-2xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                            placeholder="alamat@email.com"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Nomor Telepon</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                            <Smartphone size={18} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            defaultValue="+6212346578"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-2xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium"
                                                            placeholder="+62..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-gray-100 dark:border-gray-700 mb-8" />

                                            <div className="mb-10">
                                                <h3 className="text-sm font-bold text-[#1E293B] dark:text-white mb-6">Ubah Password</h3>
                                                <div className="max-w-full">
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Password Baru</label>
                                                    <div className="relative">
                                                        <input
                                                            type="password"
                                                            defaultValue="........"
                                                            className="w-full px-5 py-3.5 bg-[#F8FAFC] dark:bg-gray-900/50 border border-transparent focus:border-[#E8532F] focus:bg-white dark:focus:bg-gray-900 rounded-2xl text-sm transition-all outline-none text-gray-700 dark:text-gray-300 font-medium tracking-widest"
                                                        />
                                                        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                            <EyeOff size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delete Account */}
                                            <div className="bg-[#FFF1F1] dark:bg-red-900/10 border border-[#FFE4E4] dark:border-red-900/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2.5 bg-white dark:bg-gray-800 rounded-xl text-[#FF4B4B] shadow-sm">
                                                        <AlertCircle size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <h4 className="text-sm font-bold text-[#FF4B4B]">Hapus Akun</h4>
                                                        <p className="text-[11px] text-[#FF4B4B]/80 font-medium mt-1">
                                                            Tindakan ini permanen. Semua data akan dihapus secara sistem.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="bg-[#FF4B4B] hover:bg-[#E03E3E] text-white px-8 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-md">
                                                    Hapus Akun
                                                </button>
                                            </div>
                                        </>
                                    ) : activeTab === "notifications" ? (
                                        <>
                                            <h2 className="text-lg font-bold text-[#1E293B] dark:text-white mb-1">Preferensi Notifikasi</h2>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 font-medium">Kelola bagaimana Anda menerima pembaruan dari MagangHub.</p>

                                            <hr className="border-gray-100 dark:border-gray-700 mb-8" />

                                            <div className="space-y-10">
                                                {[
                                                    {
                                                        id: 'submissionStatus',
                                                        label: 'Status Pengajuan',
                                                        desc: 'Beritahu saya ketika ada update status pengajuan.',
                                                        checked: notificationSettings.submissionStatus
                                                    },
                                                    {
                                                        id: 'chatMessages',
                                                        label: 'Chat & Pesan',
                                                        desc: 'Notifikasi ketika ada pesan masuk.',
                                                        checked: notificationSettings.chatMessages
                                                    },
                                                    {
                                                        id: 'newsletter',
                                                        label: 'Newsletter',
                                                        desc: 'Info event dan tips karir mingguan.',
                                                        checked: notificationSettings.newsletter
                                                    }
                                                ].map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between group">
                                                        <div className="flex-1">
                                                            <h4 className="text-sm font-bold text-[#1E293B] dark:text-white group-hover:text-[#E8532F] transition-colors">{item.label}</h4>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">{item.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setNotificationSettings(prev => ({
                                                                ...prev,
                                                                [item.id]: !prev[item.id as keyof typeof notificationSettings]
                                                            }))}
                                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.checked ? 'bg-[#E8532F]' : 'bg-gray-200 dark:bg-gray-700'}`}
                                                        >
                                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.checked ? 'translate-x-5' : 'translate-x-0'}`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                                            <Bell size={48} className="mb-4 opacity-20" />
                                            <p className="font-medium">Konten Notifikasi Segera Hadir</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 bg-[#F8FAFC] dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                                    <button className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-[#E8532F] hover:bg-[#d44828] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        {activeTab === 'notifications' ? 'Simpan Pengaturan' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
