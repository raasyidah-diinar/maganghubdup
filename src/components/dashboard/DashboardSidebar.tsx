"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Briefcase,
    MessageSquare,
    FileText,
    FolderKanban,
    BookOpen,
    User,
    Settings,
    Search,
    Building2,
    GraduationCap,
    Users,
    BookMarked,
    Heart,
    LayoutGrid,
    ChevronsUpDown,
    Check,
    Plus,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const memberNavItems: NavItem[] = [
    { label: "Dashboard", href: "/id/dashboard", icon: <LayoutGrid size={18} /> },
    { label: "Magang Saya", href: "/id/dashboard/internship", icon: <Briefcase size={18} /> },
    { label: "Pesan", href: "/id/dashboard/messages", icon: <MessageSquare size={18} /> },
    { label: "Blog Saya", href: "/id/dashboard/blog", icon: <FileText size={18} /> },
    { label: "Proyek", href: "/id/dashboard/projects", icon: <FolderKanban size={18} /> },
    { label: "LogBook", href: "/id/dashboard/logbook", icon: <BookOpen size={18} /> },
    { label: "Profil & CV", href: "/id/dashboard/profile", icon: <User size={18} /> },
    { label: "Pengaturan Akun", href: "/id/dashboard/settings", icon: <Settings size={18} /> },
];

const explorationNavItems: NavItem[] = [
    { label: "Lowongan", href: "/id/dashboard/jobs", icon: <Search size={18} /> },
    { label: "Tempat Magang", href: "/id/dashboard/magang", icon: <Building2 size={18} /> },
    { label: "Instansi Pendidikan", href: "/id/dashboard/pendidikan", icon: <GraduationCap size={18} /> },
    { label: "Anggota", href: "/id/dashboard/members", icon: <Users size={18} /> },
    { label: "Blog", href: "/id/dashboard/blogs", icon: <BookMarked size={18} /> },
    { label: "Favorit", href: "/id/dashboard/favorites", icon: <Heart size={18} /> },
];

interface Organization {
    id: string;
    name: string;
    type: string;
    role: string;
    avatar?: string;
}

interface DashboardSidebarProps {
    user?: {
        name: string;
        role: string;
        avatar?: string;
    };
    organizations?: Organization[];
    isOpen?: boolean;
    onClose?: () => void;
}

export default function DashboardSidebar({
    user,
    organizations = [
        {
            id: "1",
            name: "Glints",
            type: "Industry",
            role: "Owner",
            avatar: "/gambar1.png"
        },
        {
            id: "2",
            name: "SMK Telkom Mana",
            type: "Pendidikan, Industry",
            role: "Owner",
            avatar: "/smktelkom.png"
        },
        {
            id: "3",
            name: "SMK Negeri 100 Jakarta",
            type: "Pendidikan",
            role: "Owner",
            avatar: "/smktelkom.png"
        }
    ],
    isOpen = false,
    onClose
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);

    const defaultUser = {
        name: user?.name || "Raasyidah Diinar Kaamilah",
        role: user?.role || "raasyidahdiinar",
        avatar: user?.avatar || "/hyein.png",
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Profile Dropdown Overlay */}
            {isProfileExpanded && (
                <div
                    className="fixed inset-0 z-[60]"
                    onClick={() => setIsProfileExpanded(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out lg:static lg:inset-auto ${isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0 lg:w-16"
                    }`}
            >
                {/* User Profile Section with Card */}
                <div className={`px-3 py-3 whitespace-nowrap overflow-visible transition-all duration-300 flex items-start flex-shrink-0 relative ${!isOpen ? "lg:justify-center" : ""
                    }`}>
                    {isOpen ? (
                        <div className="w-full relative">
                            {/* Main Profile Card */}
                            <button
                                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                            >
                                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                                    {defaultUser.avatar ? (
                                        <Image
                                            src={defaultUser.avatar}
                                            alt={defaultUser.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] flex items-center justify-center text-white font-bold text-sm">
                                            <span>{defaultUser.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {defaultUser.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {defaultUser.role}
                                    </p>
                                </div>
                                <ChevronsUpDown size={14} className="text-gray-400 flex-shrink-0" />
                            </button>

                            {/* Expanded Dropdown - Simple appearance */}
                            {isProfileExpanded && (
                                <div className="fixed left-[288px] top-3 w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl z-[70] overflow-hidden">
                                    {/* Member Section */}
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2.5 tracking-wider">
                                            Member
                                        </p>
                                        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-orange-50 dark:bg-orange-900/10">
                                            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                                                {defaultUser.avatar ? (
                                                    <Image
                                                        src={defaultUser.avatar}
                                                        alt={defaultUser.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] flex items-center justify-center text-white font-bold text-sm">
                                                        <span>{defaultUser.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                    {defaultUser.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {defaultUser.role}
                                                </p>
                                            </div>
                                            <Check size={18} className="text-[#E8532F] flex-shrink-0" />
                                        </div>
                                    </div>

                                    {/* Organizations Section */}
                                    <div className="p-4">
                                        <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2.5 tracking-wider">
                                            Organisasi
                                        </p>
                                        <div className="space-y-1">
                                            {organizations.map((org) => (
                                                <button
                                                    key={org.id}
                                                    onClick={() => setIsProfileExpanded(false)}
                                                    className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                >
                                                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                                                        {org.avatar ? (
                                                            <Image
                                                                src={org.avatar}
                                                                alt={org.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">
                                                                {org.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 text-left">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {org.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {org.type} • {org.role}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Add Organization Button */}
                                            <button
                                                onClick={() => setIsProfileExpanded(false)}
                                                className="w-full flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-400 mt-2"
                                            >
                                                <Plus size={18} />
                                                <span className="text-sm font-medium">Tambah Organisasi</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            {defaultUser.avatar ? (
                                <Image
                                    src={defaultUser.avatar}
                                    alt={defaultUser.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] flex items-center justify-center text-white font-bold">
                                    <span>{defaultUser.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 whitespace-nowrap overflow-y-auto custom-scrollbar">
                    {/* UTAMA Section */}
                    <div className="mb-6">
                        {isOpen && (
                            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 px-2 tracking-wider">
                                Utama
                            </h3>
                        )}
                        <ul className="space-y-0.5">
                            {memberNavItems.slice(0, 1).map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center transition-all duration-200 ${isOpen
                                                ? `gap-3 px-3 py-2.5 rounded-xl mx-1 ${isActive
                                                    ? "bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-lg shadow-orange-500/50"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`
                                                : `justify-center py-2.5 ${isActive
                                                    ? ""
                                                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                                                }`
                                                }`}
                                            title={!isOpen ? item.label : undefined}
                                        >
                                            <div className={`flex-shrink-0 flex items-center justify-center ${!isOpen && isActive
                                                ? "w-9 h-9 rounded-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-md"
                                                : ""
                                                }`}>
                                                {item.icon}
                                            </div>
                                            {isOpen && (
                                                <span className="text-sm font-medium">
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* ANGGOTA Section */}
                    <div className="mb-6">
                        {isOpen && (
                            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 px-2 tracking-wider">
                                Anggota
                            </h3>
                        )}
                        <ul className="space-y-0.5">
                            {memberNavItems.slice(1).map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center transition-all duration-200 ${isOpen
                                                ? `gap-3 px-3 py-2.5 rounded-xl mx-1 ${isActive
                                                    ? "bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-lg shadow-orange-500/50"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`
                                                : `justify-center py-2.5 ${isActive
                                                    ? ""
                                                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                                                }`
                                                }`}
                                            title={!isOpen ? item.label : undefined}
                                        >
                                            <div className={`flex-shrink-0 flex items-center justify-center ${!isOpen && isActive
                                                ? "w-9 h-9 rounded-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-md"
                                                : ""
                                                }`}>
                                                {item.icon}
                                            </div>
                                            {isOpen && (
                                                <span className="text-sm font-medium">
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* EKSPLORASI Section */}
                    <div>
                        {isOpen && (
                            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 px-2 tracking-wider">
                                Eksplorasi
                            </h3>
                        )}
                        <ul className="space-y-0.5">
                            {explorationNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center transition-all duration-200 ${isOpen
                                                ? `gap-3 px-3 py-2.5 rounded-xl mx-1 ${isActive
                                                    ? "bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-lg shadow-orange-500/50"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`
                                                : `justify-center py-2.5 ${isActive
                                                    ? ""
                                                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                                                }`
                                                }`}
                                            title={!isOpen ? item.label : undefined}
                                        >
                                            <div className={`flex-shrink-0 flex items-center justify-center ${!isOpen && isActive
                                                ? "w-9 h-9 rounded-full bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white shadow-md"
                                                : ""
                                                }`}>
                                                {item.icon}
                                            </div>
                                            {isOpen && (
                                                <span className="text-sm font-medium">
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* MagangHub Branding */}
                <div className={`border-t border-gray-200 dark:border-gray-700 p-4 whitespace-nowrap overflow-hidden flex-shrink-0 ${!isOpen ? "lg:flex lg:justify-center lg:p-3" : ""
                    }`}>
                    <Link href="/id" className="flex items-center gap-2">
                        <div className="relative w-8 h-8 flex-shrink-0 bg-[#FFF5F0] dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                            <Image
                                src="/maganghublogo.webp"
                                alt="MagangHub"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                        </div>
                        {isOpen && (
                            <div>
                                <span className="text-base font-bold bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] bg-clip-text text-transparent block leading-tight">
                                    MagangHub
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Platform Magang
                                </span>
                            </div>
                        )}
                    </Link>
                </div>
            </aside>
        </>
    );
}