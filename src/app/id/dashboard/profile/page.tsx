"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Briefcase,
    GraduationCap,
    Award,
    ExternalLink,
    Loader2,
    Pencil,
    Globe,
    Plus,
    X,
    Languages as LanguagesIcon,
    ChevronDown,
    Trash2,
    Trophy,
    Heart,
    ShieldCheck,
    Calendar
} from "lucide-react";
import MemberHeader from "@/components/members/MemberHeader";
import MemberSidebar from "@/components/members/MemberSidebar";

const PROFICIENCY_OPTIONS = [
    "Native / Bilingual Proficiency",
    "Full Professional Proficiency",
    "Professional Working Proficiency",
    "Limited Working Proficiency",
    "Elementary Proficiency",
];

export default function ProfilePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLanguagesExpanded, setIsLanguagesExpanded] = useState(false);
    const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
    const [newLangName, setNewLangName] = useState("");
    const [newLangProficiency, setNewLangProficiency] = useState("");
    const [editingLangIndex, setEditingLangIndex] = useState<number | null>(null);
    const [editLangName, setEditLangName] = useState("");
    const [editLangProficiency, setEditLangProficiency] = useState("");
    const [languagesList, setLanguagesList] = useState([
        { language: "Bahasa Indonesia", proficiency: "Native / Bilingual Proficiency" },
        { language: "English", proficiency: "Professional Working Proficiency (TOEFL: 550)" }
    ]);
    const [experienceList, setExperienceList] = useState([
        {
            title: "Unity Game Programmer Intern",
            company: "PT Orbit Nasional Edukasi (Indibiz)",
            period: "Februari 2025 - Juli 2025",
            location: "Jakarta Selatan",
            description: "Membangun fitur-fitur gameplay utama, integrasi API, serta melakukan optimalisasi performa pada sistem Android guna mendukung kelancaran game."
        },
        {
            title: "Technical Game Developer Mentor",
            company: "AMIKOM COMPUTER CLUB",
            period: "Oktober 2024 - Februari 2025",
            location: "Sleman, Yogyakarta",
            description: "Membimbing anggota dalam mempelajari pembuatan game menggunakan Unity, C#, serta pembuatan aset 2D/3D yang digunakan dalam pengembangan game."
        }
    ]);

    const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
    const [expTitle, setExpTitle] = useState("");
    const [expCompany, setExpCompany] = useState("");
    const [expPeriod, setExpPeriod] = useState("");
    const [expLocation, setExpLocation] = useState("");
    const [expDescription, setExpDescription] = useState("");

    const [showAddEducationModal, setShowAddEducationModal] = useState(false);
    const [eduSchool, setEduSchool] = useState("");
    const [eduDegree, setEduDegree] = useState("");
    const [eduPeriod, setEduPeriod] = useState("");
    const [eduDescription, setEduDescription] = useState("");
    const [educationList, setEducationList] = useState([
        {
            school: "Institut Teknologi Bandung",
            degree: "S1 Sekolah Teknik Elektro dan Informatika (STEI)",
            period: "2027 - 2030 (Expected)",
            description: "Focusing on Advanced Computer Science and Systems Architecture."
        },
        {
            school: "Digital Academy by GoTo, Gojek, Traveloka",
            degree: "Mobile Development Path",
            period: "2023 - 2024",
            description: "Intensive training in modern mobile app architecture and ecosystem."
        }
    ]);
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

        const timer = setTimeout(() => setIsLoading(false), 800);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    const memberData = {
        id: 999,
        name: "Raasyidah Diinar Kaamilah",
        slug: "raasyidah-diinar",
        role: "Technical Unity Game Developer",
        avatar: "/hyein.png",
        banner: "/pemandangan.png",
        location: "Yogyakarta, Indonesia",
        isVerified: true,
        timePosted: "Online",
        blogsCount: 1,
        summary: "Mahasiswa Teknik Informatika tahun ke-3 dengan spesialisasi pengembangan Game Engine Unity. Berpengalaman dalam membangun mekanik gameplay yang kompleks, optimasi performa pada perangkat mobile, serta pengembangan teknologi imersif (AR/VR). Memiliki antusiasme tinggi pada Clean Code (C#), Design Patterns, dan integrasi Artificial Intelligence dalam game.",
        stats: {
            likes: 4,
            followers: 450,
            following: 3
        },
        internshipActivities: [
            { company: "Tokopedia", period: "5 Mar - 15 Nov 2025", logo: "/traveloka.png", status: "SELESAI" },
            { company: "Gojek", period: "15 Feb 2025 - Sekarang", logo: "/gambar3.png", status: "SEDANG BERJALAN" }
        ],
        experience: experienceList,
        education: educationList,
        awards: [
            {
                title: "Winner of Amikom Game Jam",
                issuer: "Universitas Amikom Yogyakarta",
                date: "2024",
                description: "Juara 1 dalam kategori Gameplay Mechanic terbaik untuk proyek game 3D Puzzle."
            }
        ],
        volunteering: [
            {
                role: "Core Team Member",
                organization: "Google Developer Student Clubs (GDSC)",
                period: "2023 - 2024",
                description: "Membantu koordinasi event teknis dan workshop programming di lingkungan kampus."
            }
        ],
        skills: ["Unity (C#)", "Java Engineering", "C# Development", "UI/UX Design", "Game Programming", "System Architecture", "Object Oriented Programming"],
        projects: [
            {
                title: "Hero Defense: VR Tour",
                description: "Game VR bertema strategi untuk edukasi sejarah nusantara yang berhasil dipublikasikan di Oculus Store.",
                tech: ["Unity VR", "C# Development"]
            },
            {
                title: "Smart City AI Simulation",
                description: "Simulasi interaktif kerya bersama tim untuk menghitung jejak karbon di area perkotaan menggunakan AI.",
                tech: ["Artificial Intelligence", "Unity 3D"]
            }
        ],
        languages: languagesList,
        certifications: [
            {
                title: "Unity Certified User: Programmer",
                issuer: "Unity Technologies"
            },
            {
                title: "Dicoding: Menjadi Game Developer Expert",
                issuer: "Dicoding Indonesia"
            }
        ]
    };

    const blogs = [
        {
            title: "Membangun Game VR Pertama Anda di Unity",
            date: "24 Des 2025",
            thumbnail: "/pemandangan.png"
        }
    ];

    if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Memuat profil...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 relative">
                                        <MemberHeader member={memberData as any} isOwnProfile={true} />

                                        <div className="p-8 md:p-12 space-y-14">
                                            {/* Summary Section */}
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="border-l-4 border-orange-500 pl-5">
                                                        <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Summary</h3>
                                                    </div>
                                                    <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                                <div className="pl-6">
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[13px] font-medium">
                                                        {memberData.summary}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Internship Activities */}
                                            <div className="space-y-6">
                                                <div className="border-l-4 border-orange-500 pl-5">
                                                    <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Internship Activities</h3>
                                                </div>
                                                <div className="pl-6 space-y-5">
                                                    {memberData.internshipActivities.map((activity, idx) => (
                                                        <div key={idx} className="flex items-center justify-between group">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                                                    <div className="relative w-7 h-7">
                                                                        <Image src={activity.logo} alt={activity.company} fill className="object-contain" />
                                                                    </div>
                                                                </div>
                                                                <p className="font-bold text-[#1E293B] dark:text-white text-[13px]">{activity.company}</p>
                                                            </div>
                                                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold ${activity.status === "SELESAI" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                                                                }`}>
                                                                {activity.period}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Experience Section */}
                                            <div className="space-y-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="border-l-4 border-orange-500 pl-5">
                                                        <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Experience</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href="/id/dashboard/profile/experience"
                                                            className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setExpTitle("");
                                                                setExpCompany("");
                                                                setExpPeriod("");
                                                                setExpLocation("");
                                                                setExpDescription("");
                                                                setShowAddExperienceModal(true);
                                                            }}
                                                            className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="pl-6 space-y-10">
                                                    {experienceList.map((exp, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                                <Briefcase size={22} className="text-orange-500" />
                                                            </div>
                                                            <div className="space-y-2 flex-1">
                                                                <div className="flex justify-between items-start gap-4">
                                                                    <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{exp.title}</h4>
                                                                    <span className="px-4 py-1.5 bg-[#F1F5F9] dark:bg-gray-800 text-[#64748B] dark:text-gray-400 rounded-full text-[10px] font-bold whitespace-nowrap">
                                                                        {exp.period}
                                                                    </span>
                                                                </div>
                                                                <p className="text-orange-600 dark:text-orange-400 font-bold text-xs">
                                                                    {exp.company} • {exp.location}
                                                                </p>
                                                                <div className="pt-1">
                                                                    <p className="italic text-[#64748B] dark:text-gray-400 text-xs leading-relaxed">
                                                                        {exp.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Education Section */}
                                            <div className="space-y-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="border-l-4 border-orange-500 pl-5">
                                                        <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Education</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href="/id/dashboard/profile/education"
                                                            className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setEduSchool("");
                                                                setEduDegree("");
                                                                setEduPeriod("");
                                                                setEduDescription("");
                                                                setShowAddEducationModal(true);
                                                            }}
                                                            className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="pl-6 space-y-10">
                                                    {memberData.education.map((edu, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start">
                                                            <div className="w-12 h-12 bg-[#F8FAFC] dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-50 dark:border-gray-700">
                                                                <GraduationCap size={22} className="text-orange-500" />
                                                            </div>
                                                            <div className="space-y-1 flex-1">
                                                                <div className="flex justify-between items-start gap-4">
                                                                    <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{edu.school}</h4>
                                                                    <span className="text-orange-500 dark:text-orange-400 text-[11px] font-bold whitespace-nowrap">
                                                                        {edu.period}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{edu.degree}</p>
                                                                <div className="pt-2">
                                                                    <p className="italic text-[#64748B] dark:text-gray-400 text-[12px] leading-relaxed">
                                                                        {edu.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Honors & Awards Section */}
                                            {memberData.awards && memberData.awards.length > 0 && (
                                                <div className="space-y-8">
                                                    <div className="flex items-start justify-between">
                                                        <div className="border-l-4 border-orange-500 pl-5">
                                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Honors & Awards</h3>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="pl-6 space-y-10">
                                                        {memberData.awards.map((award, idx) => (
                                                            <div key={idx} className="flex gap-6 items-start">
                                                                <div className="w-12 h-12 bg-[#FFFBEB] dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-50 dark:border-amber-900/30">
                                                                    <Trophy size={22} className="text-amber-500" />
                                                                </div>
                                                                <div className="space-y-1 flex-1">
                                                                    <div className="flex justify-between items-start gap-4">
                                                                        <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{award.title}</h4>
                                                                        <span className="text-orange-500 dark:text-orange-400 text-[11px] font-bold whitespace-nowrap">
                                                                            {award.date}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{award.issuer}</p>
                                                                    {award.description && (
                                                                        <div className="pt-2">
                                                                            <p className="italic text-[#64748B] dark:text-gray-400 text-[12px] leading-relaxed">
                                                                                {award.description}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Volunteering Section */}
                                            {memberData.volunteering && memberData.volunteering.length > 0 && (
                                                <div className="space-y-8">
                                                    <div className="flex items-start justify-between">
                                                        <div className="border-l-4 border-orange-500 pl-5">
                                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Volunteering</h3>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="pl-6 space-y-10">
                                                        {memberData.volunteering.map((vol, idx) => (
                                                            <div key={idx} className="flex gap-6 items-start">
                                                                <div className="w-12 h-12 bg-[#FFF1F2] dark:bg-rose-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-rose-50 dark:border-rose-900/30">
                                                                    <Heart size={22} className="text-rose-500" />
                                                                </div>
                                                                <div className="space-y-1 flex-1">
                                                                    <div className="flex justify-between items-start gap-4">
                                                                        <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{vol.role}</h4>
                                                                        <span className="text-[#94A3B8] dark:text-gray-400 text-[11px] font-bold whitespace-nowrap">
                                                                            {vol.period}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-rose-600 dark:text-rose-400 font-bold text-[13px]">
                                                                        {vol.organization}
                                                                    </p>
                                                                    {vol.description && (
                                                                        <div className="pt-2">
                                                                            <p className="italic text-[#64748B] dark:text-gray-400 text-[12px] leading-relaxed">
                                                                                {vol.description}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Skills Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="border-l-4 border-orange-500 pl-5">
                                                        <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Technical Skills</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="pl-6 flex flex-wrap gap-2.5">
                                                    {memberData.skills.map((skill, idx) => (
                                                        <span key={idx} className="px-5 py-2.5 bg-[#F1F5F9] dark:bg-gray-800 text-[#475569] dark:text-gray-300 rounded-full text-xs font-bold border border-transparent hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-orange-200">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Languages Section */}
                                            {!isLanguagesExpanded ? (
                                                /* Collapsed view - original inline display */
                                                memberData.languages && memberData.languages.length > 0 && (
                                                    <div className="space-y-6">
                                                        <div className="flex items-start justify-between">
                                                            <div className="border-l-4 border-orange-500 pl-5">
                                                                <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Languages</h3>
                                                            </div>
                                                            <button
                                                                onClick={() => setIsLanguagesExpanded(true)}
                                                                className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="pl-6 space-y-4">
                                                            {memberData.languages.map((lang, idx) => (
                                                                <div key={idx} className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700/50 pb-4 last:border-0 last:pb-0">
                                                                    <p className="font-bold text-[#1E293B] dark:text-white text-[14px]">{lang.language}</p>
                                                                    <p className="text-[#94A3B8] dark:text-gray-400 text-xs font-medium">{lang.proficiency}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                /* Expanded view - Languages detail card */
                                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                                                        <div className="flex items-center gap-3">
                                                            <Globe size={20} className="text-[#475569] dark:text-gray-300" />
                                                            <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Languages</h3>
                                                        </div>
                                                        <button
                                                            onClick={() => setShowAddLanguageModal(true)}
                                                            className="w-8 h-8 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-sm"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                    <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                                                        {languagesList.map((lang, idx) => (
                                                            <div key={idx} className="flex items-center gap-4 px-6 py-5 group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                    <LanguagesIcon size={20} className="text-orange-500" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-bold text-[#0F172A] dark:text-white text-[14px]">{lang.language}</p>
                                                                    <p className="text-[#94A3B8] dark:text-gray-400 text-[12px] font-medium mt-0.5">{lang.proficiency}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingLangIndex(idx);
                                                                            setEditLangName(lang.language);
                                                                            setEditLangProficiency(lang.proficiency);
                                                                        }}
                                                                        className="p-2 text-gray-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all"
                                                                    >
                                                                        <Pencil size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setLanguagesList(prev => prev.filter((_, i) => i !== idx));
                                                                        }}
                                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                                                        <button
                                                            onClick={() => setIsLanguagesExpanded(false)}
                                                            className="text-[13px] font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                                        >
                                                            ← Kembali
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Licenses & Certifications Section */}
                                            {memberData.certifications && memberData.certifications.length > 0 && (
                                                <div className="space-y-8">
                                                    <div className="flex items-start justify-between">
                                                        <div className="border-l-4 border-orange-500 pl-5">
                                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Licenses & Certifications</h3>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="pl-6 space-y-8">
                                                        {memberData.certifications.map((cert, idx) => (
                                                            <div key={idx} className="flex gap-6 items-start">
                                                                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-50 dark:border-emerald-900/30">
                                                                    <ShieldCheck size={22} className="text-emerald-500" />
                                                                </div>
                                                                <div className="space-y-1 flex-1">
                                                                    <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{cert.title}</h4>
                                                                    <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{cert.issuer}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Portfolio Section */}
                                            <div className="space-y-8">
                                                <div className="flex items-start justify-between">
                                                    <div className="border-l-4 border-orange-500 pl-5">
                                                        <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Portfolio / Projects</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all">
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="pl-6 space-y-10">
                                                    {memberData.projects.map((project, idx) => (
                                                        <div key={idx} className="flex gap-6 items-start group">
                                                            <div className="w-12 h-12 bg-[#F8FAFC] dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-50 dark:border-gray-700 group-hover:border-orange-200 transition-colors">
                                                                <ExternalLink size={22} className="text-orange-500" />
                                                            </div>
                                                            <div className="space-y-2 flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white group-hover:text-orange-600 transition-colors">{project.title}</h4>
                                                                </div>
                                                                <p className="text-[#64748B] dark:text-gray-400 text-xs leading-relaxed max-w-2xl">
                                                                    {project.description}
                                                                </p>
                                                                <div className="flex items-center gap-2 pt-1">
                                                                    <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-tight">Skills:</span>
                                                                    <div className="flex gap-3">
                                                                        {project.tech.map((t, i) => (
                                                                            <span key={i} className="text-[11px] font-bold text-[#64748B] dark:text-gray-400">
                                                                                • {t}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* My Blogs Section */}
                                            {blogs && blogs.length > 0 && (
                                                <div className="space-y-8">
                                                    <div className="flex items-start justify-between">
                                                        <div className="border-l-4 border-orange-500 pl-5">
                                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">My Blogs</h3>
                                                        </div>
                                                        <button className="text-[13px] font-bold text-orange-500 hover:text-orange-600 transition-colors">
                                                            Lihat semua
                                                        </button>
                                                    </div>
                                                    <div className="pl-6 space-y-6">
                                                        {blogs.map((blog, idx) => (
                                                            <div key={idx} className="flex gap-5 items-center group cursor-pointer">
                                                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
                                                                    <Image
                                                                        src={blog.thumbnail}
                                                                        alt={blog.title}
                                                                        width={80}
                                                                        height={80}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <h4 className="text-[15px] font-bold text-orange-600 dark:text-orange-400 group-hover:text-orange-700 transition-colors">
                                                                        {blog.title}
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 text-[#94A3B8] dark:text-gray-400">
                                                                        <Calendar size={14} />
                                                                        <span className="text-[12px] font-medium">{blog.date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <MemberSidebar />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Tambah Bahasa Modal */}
            {showAddLanguageModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddLanguageModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
                        <button
                            onClick={() => {
                                setShowAddLanguageModal(false);
                                setNewLangName("");
                                setNewLangProficiency("");
                            }}
                            className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6">Tambah Bahasa</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2">Nama Bahasa</label>
                                <input
                                    type="text"
                                    value={newLangName}
                                    onChange={(e) => setNewLangName(e.target.value)}
                                    placeholder="Contoh: Indonesia, Inggris, Jepang..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2">Tingkat Kemahiran (Level)</label>
                                <div className="relative">
                                    <select
                                        value={newLangProficiency}
                                        onChange={(e) => setNewLangProficiency(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 appearance-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30 transition-all cursor-pointer"
                                    >
                                        <option value="" disabled>Pilih tingkat kemahiran</option>
                                        {PROFICIENCY_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setShowAddLanguageModal(false);
                                    setNewLangName("");
                                    setNewLangProficiency("");
                                }}
                                className="px-6 py-2.5 text-sm font-bold text-[#475569] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => {
                                    if (newLangName && newLangProficiency) {
                                        setLanguagesList(prev => [...prev, { language: newLangName, proficiency: newLangProficiency }]);
                                        setNewLangName("");
                                        setNewLangProficiency("");
                                        setShowAddLanguageModal(false);
                                    }
                                }}
                                disabled={!newLangName || !newLangProficiency}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Bahasa Modal */}
            {editingLangIndex !== null && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingLangIndex(null)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
                        <button
                            onClick={() => setEditingLangIndex(null)}
                            className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6">Edit Bahasa</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2">Nama Bahasa</label>
                                <input
                                    type="text"
                                    value={editLangName}
                                    onChange={(e) => setEditLangName(e.target.value)}
                                    placeholder="Contoh: Indonesia, Inggris, Jepang..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2">Tingkat Kemahiran (Level)</label>
                                <div className="relative">
                                    <select
                                        value={editLangProficiency}
                                        onChange={(e) => setEditLangProficiency(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 appearance-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30 transition-all cursor-pointer"
                                    >
                                        <option value="" disabled>Pilih tingkat kemahiran</option>
                                        {PROFICIENCY_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setLanguagesList(prev => prev.filter((_, i) => i !== editingLangIndex));
                                    setEditingLangIndex(null);
                                }}
                                className="px-6 py-2.5 text-sm font-bold text-[#475569] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => {
                                    if (editLangName && editLangProficiency) {
                                        setLanguagesList(prev => prev.map((item, i) =>
                                            i === editingLangIndex
                                                ? { language: editLangName, proficiency: editLangProficiency }
                                                : item
                                        ));
                                        setEditingLangIndex(null);
                                    }
                                }}
                                disabled={!editLangName || !editLangProficiency}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Tambah Experience Modal */}
            {showAddExperienceModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddExperienceModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setShowAddExperienceModal(false)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-6 bg-orange-600 rounded-full" />
                            <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">Tambah Experience</h2>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Posisi/Jabatan</label>
                                <input
                                    type="text"
                                    value={expTitle}
                                    onChange={(e) => setExpTitle(e.target.value)}
                                    placeholder="Contoh: Senior Developer"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    value={expCompany}
                                    onChange={(e) => setExpCompany(e.target.value)}
                                    placeholder="Contoh: PT. Maju Jaya"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Periode</label>
                                <input
                                    type="text"
                                    value={expPeriod}
                                    onChange={(e) => setExpPeriod(e.target.value)}
                                    placeholder="Contoh: 2022 - Sekarang"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Lokasi (Opsional)</label>
                                <input
                                    type="text"
                                    value={expLocation}
                                    onChange={(e) => setExpLocation(e.target.value)}
                                    placeholder="Contoh: Jakarta / Remote"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Deskripsi Pekerjaan</label>
                                <textarea
                                    value={expDescription}
                                    onChange={(e) => setExpDescription(e.target.value)}
                                    placeholder="Jelaskan tanggung jawab dan pencapaian Anda..."
                                    rows={4}
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <button
                                onClick={() => {
                                    if (expTitle && expCompany && expPeriod) {
                                        setExperienceList(prev => [{
                                            title: expTitle,
                                            company: expCompany,
                                            period: expPeriod,
                                            location: expLocation,
                                            description: expDescription
                                        }, ...prev]);
                                        setShowAddExperienceModal(false);
                                    }
                                }}
                                disabled={!expTitle || !expCompany || !expPeriod}
                                className="w-full py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Tambah Education Modal */}
            {showAddEducationModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddEducationModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setShowAddEducationModal(false)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-6 bg-orange-600 rounded-full" />
                            <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">Tambah Education</h2>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Sekolah/Kampus</label>
                                <input
                                    type="text"
                                    value={eduSchool}
                                    onChange={(e) => setEduSchool(e.target.value)}
                                    placeholder="Contoh: Universitas Indonesia"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Jurusan/Gelar</label>
                                <input
                                    type="text"
                                    value={eduDegree}
                                    onChange={(e) => setEduDegree(e.target.value)}
                                    placeholder="Contoh: S1 Teknik Informatika"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Tahun</label>
                                <input
                                    type="text"
                                    value={eduPeriod}
                                    onChange={(e) => setEduPeriod(e.target.value)}
                                    placeholder="Contoh: 2019 - 2023"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Detail Tambahan</label>
                                <textarea
                                    value={eduDescription}
                                    onChange={(e) => setEduDescription(e.target.value)}
                                    placeholder="IPK, Organisasi, atau Konsentrasi..."
                                    rows={4}
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <button
                                onClick={() => {
                                    if (eduSchool && eduDegree && eduPeriod) {
                                        setEducationList(prev => [{
                                            school: eduSchool,
                                            degree: eduDegree,
                                            period: eduPeriod,
                                            description: eduDescription
                                        }, ...prev]);
                                        setShowAddEducationModal(false);
                                    }
                                }}
                                disabled={!eduSchool || !eduDegree || !eduPeriod}
                                className="w-full py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
