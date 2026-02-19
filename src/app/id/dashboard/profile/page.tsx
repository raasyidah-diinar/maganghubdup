"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    MapPin,
    Download,
    Edit2,
    Plus,
    CheckCircle2,
    MessageCircle,
    Globe,
    ExternalLink,
    Search,
    ChevronDown,
    Building2,
    Calendar,
    Code,
    Award,
    Heart,
    MoreHorizontal,
} from "lucide-react";
import {
    ProfileSection,
    ExpItem,
    EduItem,
    SkillTag,
    ConnectionItem
} from "@/components/dashboard/profile/ProfileSections";

export default function ProfilePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    const user = {
        name: "Raasyidah Diinar Kaamilah",
        username: "raasyidahdiinar",
        title: "Technical Unity Game Developer",
        location: "Yogyakarta, Indonesia",
        avatar: "/hyein.png",
        cover: "/pemandangan.png",
        stats: {
            likes: "4",
            followers: "450",
            following: "3",
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto pb-12">
                    {/* Cover & Header Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                            {/* Cover Photo */}
                            <div className="relative h-48 md:h-64 overflow-hidden">
                                <Image
                                    src={user.cover}
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Profile Info Area */}
                            <div className="relative px-8 pb-10 mt-[-64px] md:mt-[-84px] pt-16 md:pt-20">
                                {/* Top Actions (Download CV & Public Badge) */}
                                <div className="absolute top-18 md:top-24 right-8 flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-[#EFFBF4] dark:bg-green-900/20 text-[#22C55E] px-3 py-1 rounded-full text-[10px] font-bold border border-[#DCF7E3] dark:border-green-800/30">
                                        <Globe size={12} />
                                        PUBLIC
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-[#E8532F] text-[#E8532F] rounded-full text-xs font-bold hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all">
                                        <Download size={14} />
                                        Download CV
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row items-start gap-8">
                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-xl relative z-10">
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1 min-w-0 pt-4 md:pt-8">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <h1 className="text-3xl font-bold text-[#1E293B] dark:text-white leading-tight">
                                                {user.name}
                                            </h1>
                                            <CheckCircle2 size={24} className="text-[#3B82F6] shrink-0" fill="currentColor" />
                                        </div>
                                        <p className="text-[#E8532F] dark:text-orange-400 font-bold mb-4 text-base">
                                            {user.title}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                            <MapPin size={16} />
                                            <span>Depok, Sleman</span>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 mb-8">
                                            <span><span className="font-bold text-gray-900 dark:text-white mr-1">1</span> Blog</span>
                                            <span><span className="font-bold text-gray-900 dark:text-white mr-1">420</span> Pengikut</span>
                                            <span><span className="font-bold text-gray-900 dark:text-white mr-1">7</span> Diikuti</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">
                                                <Edit2 size={16} />
                                                Edit Profile
                                            </button>
                                            <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                                                <MoreHorizontal size={18} className="rotate-90" />
                                                Set Private
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Two Column Layout for Profile Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-8">
                            {/* Left Column: Profile Sections */}
                            <div className="space-y-8">
                                {/* Summary Section */}
                                <ProfileSection title="SUMMARY" onEdit={() => { }}>
                                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed max-w-4xl font-medium">
                                        Mahasiswa Teknik Informatika tahun ke-3 dengan spesialisasi pengembangan Game Engine Unity.
                                        Berpengalaman dalam membangun mekanik gameplay yang kompleks, optimasi performa pada perangkat mobile,
                                        serta pengembangan teknologi imersif (AR/VR). Memiliki antusiasme tinggi pada Clean Code (C#),
                                        Design Patterns, dan integrasi Artificial Intelligence dalam game. Terbiasa bekerja dalam tim dengan...
                                    </p>
                                </ProfileSection>

                                {/* Internship Activities */}
                                <ProfileSection title="Internship Activities">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 p-2 shadow-sm border border-gray-100 dark:border-gray-600">
                                                    <Image src="/traveloka.png" alt="Tokopedia" width={32} height={32} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">Tokopedia</h4>
                                                    <p className="text-xs text-green-600 dark:text-green-400 font-bold">SELESAI</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">5 Mar - 15 Nov 2025</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 p-2 shadow-sm border border-gray-100 dark:border-gray-600">
                                                    <Image src="/gambar3.png" alt="Gojek" width={32} height={32} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">Gojek</h4>
                                                    <p className="text-xs text-[#E8532F] font-bold">SEDANG BERJALAN</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">15 Feb 2025 - Sekarang</p>
                                            </div>
                                        </div>
                                    </div>
                                </ProfileSection>

                                {/* Experience Section */}
                                <ProfileSection title="Experience" onAdd={() => { }}>
                                    <ExpItem
                                        role="Unity Game Programmer Intern"
                                        company="PT Dash Indonesia (Nusantara Droid)"
                                        period="Februari 2025 - Juli 2025"
                                        location="Jakarta Selatan"
                                        logo="/gambar1.png"
                                        description="Membangun fitur-fitur gameplay utama, integrasi API, serta melakukan optimalisasi performa pada sistem Android guna mendukung kelancaran game."
                                    />
                                    <ExpItem
                                        role="Technical Game Developer Mentor"
                                        company="AMIKOM COMPUTER CLUB - Sleman, Yogyakarta"
                                        period="Oktober 2024 - Februari 2025"
                                        description="Membimbing anggota dalam mempelajari pembuatan game menggunakan Unity, C#, serta pembuatan aset 2D/3D yang digunakan dalam pengembangan game."
                                    />
                                    <ExpItem
                                        role="Freelance Unity Developer"
                                        company="Agama Creative Agency - Sleman, Yogyakarta"
                                        period="Januari 2023 - Oktober 2024"
                                        description="Mengembangkan game mobile skala kecil hingga menengah untuk berbagai jenis platform untuk client dari berbagai negara seperti Singapura dan Thailand."
                                    />
                                    <ExpItem
                                        role="Asisten Praktikum Pemrograman"
                                        company="Universitas Amikom Yogyakarta"
                                        period="September 2023 - Januari 2024"
                                        isLast
                                        description="Membantu dosen dalam memberikan materi praktikum kepada mahasiswa dalam mata kuliah Pemrograman Berbasis Objek menggunakan bahasa Java."
                                    />
                                </ProfileSection>

                                {/* Education Section */}
                                <ProfileSection title="Education" onAdd={() => { }} onEdit={() => { }}>
                                    <EduItem
                                        institution="Institut Teknologi Bandung"
                                        degree="S1 Sekolah Teknik Elektro dan Informatika (STEI)"
                                        period="2027 - 2030 (Expected)"
                                        logo="/itb.png"
                                    />
                                    <EduItem
                                        institution="Digital Academy by GoTo, Gojek, Traveloka"
                                        degree="Mobile Development Path"
                                        period="2023 - 2024"
                                        logo="/traveloka.png"
                                    />
                                    <EduItem
                                        institution="SMK Negeri 2 Depok Sleman (Stembayo)"
                                        degree="Teknik Komputer dan Jaringan"
                                        period="2018 - 2022"
                                        isLast
                                        logo="/smktelkom.png"
                                    />
                                </ProfileSection>

                                {/* Skills Section */}
                                <ProfileSection title="Technical Skills" onEdit={() => { }}>
                                    <div className="flex flex-wrap gap-2">
                                        {["Unity (C#)", "Java Engineering", "C# Development", "UI/UX Design", "Game Programming (Unity)", "System Architecture Design", "Framework Design", "Character Design", "Game Design", "Object Oriented Programming (OOP)", "Agile Software Development", "User Feedback Analysis"].map(skill => (
                                            <SkillTag key={skill} name={skill} />
                                        ))}
                                    </div>
                                </ProfileSection>

                                {/* Languages */}
                                <ProfileSection title="Languages" onEdit={() => { }}>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Bahasa Indonesia</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Native / Bilingual Proficiency</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">English</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Professional Working Proficiency</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Japanese</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Elementary Proficiency</span>
                                        </div>
                                    </div>
                                </ProfileSection>

                                {/* Licenses & Certifications */}
                                <ProfileSection title="Licenses & Certifications" onAdd={() => { }}>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                                                <Award className="text-green-600" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Unity Certified User: Programmer</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Unity Technologies</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Pelatihan Pengembangan Game Tingkat Depok</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Balai Pelatihan IT Sleman</p>
                                            </div>
                                        </div>
                                    </div>
                                </ProfileSection>

                                {/* Portfolio & Projects */}
                                <ProfileSection title="Portfolio & Projects" onAdd={() => { }}>
                                    <div className="space-y-6">
                                        <div className="group cursor-pointer">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-[#E8532F] transition-colors">Hero Defense: VR Tour</h4>
                                                <ExternalLink size={16} className="text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">Game VR bertema strategi untuk edukasi sejarah nusantara yang berhasil dipublikasikan di Oculus Store.</p>
                                            <div className="mt-3 flex gap-2">
                                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">Unity VR</span>
                                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">C# development</span>
                                            </div>
                                        </div>
                                        <div className="group cursor-pointer">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-[#E8532F] transition-colors">Smart City AI Simulation</h4>
                                                <ExternalLink size={16} className="text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">Simulasi interaktif kerya bersama tim untuk menghitung jejak karbon di area perkotaan menggunakan AI.</p>
                                            <div className="mt-3 flex gap-2">
                                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">Artificial Intelligence</span>
                                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">Unity 3D</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 text-sm font-bold text-[#E8532F] hover:underline">Lihat Semua Proyek</button>
                                </ProfileSection>

                                {/* Blog Placeholder */}
                                <ProfileSection title="My Blogs">
                                    <div className="flex gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 group cursor-pointer">
                                        <div className="w-20 h-16 rounded-xl overflow-hidden relative shrink-0">
                                            <Image src="/gamevr.png" alt="Blog" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#E8532F]">Membangun Game 2D Bersama Anda di Unity</h4>
                                            <p className="text-[11px] text-gray-400 font-bold mt-1">20 Sep 2025</p>
                                        </div>
                                    </div>
                                </ProfileSection>
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="space-y-8">
                                {/* Connections */}
                                <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Koneksi</h2>
                                    <div className="space-y-4">
                                        <ConnectionItem name="Martin Pratama" role="Technical Leader at Gojek" avatar="/martin.png" isVerified />
                                        <ConnectionItem name="Kazuha" role="Senior UI UX at Traveloka" avatar="/kazuha.png" />
                                        <ConnectionItem name="Siti Nurhaliza" role="HRD Recruiter" avatar="/hyein.png" />
                                        <ConnectionItem name="Reina" role="Software Engineer at Tokopedia" avatar="/rei.png" />
                                        <ConnectionItem name="Vernon Chwe" role="Game Designer" avatar="/vernon.jpg" />
                                    </div>
                                    <button className="w-full mt-6 py-2.5 text-xs font-bold text-[#E8532F] border border-orange-100 dark:border-orange-950/30 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all">Lihat Koneksi (450)</button>
                                </section>

                                {/* Recommendations */}
                                <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <h2 className="text-sm font-bold text-[#1E293B] dark:text-white mb-6">Kandidat Serupa</h2>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Taufik Hidayat", role: "Backend Engineer", avatar: "/vernon.jpg" },
                                            { name: "Aditya Pratama", role: "DevOps & Cloud Engineer", avatar: "/martin.png" },
                                            { name: "Maya Sari", role: "Cyber Security Analyst", avatar: "/rei.png" },
                                        ].map((rec, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative shrink-0">
                                                    <Image src={rec.avatar} alt={rec.name} fill sizes="56px" className="object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{rec.name}</h4>
                                                    <p className="text-[10px] text-gray-500 truncate">{rec.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
