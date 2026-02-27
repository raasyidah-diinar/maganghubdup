"use client";

import { Search, Bell, MessageSquare, Sun, Moon, PanelLeft, User, Users, Building2, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
    user?: {
        name: string;
        avatar?: string;
    };
    onMenuClick?: () => void;
    showSidebarTrigger?: boolean;
}

export default function DashboardHeader({ user, onMenuClick, showSidebarTrigger = false }: DashboardHeaderProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);

        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const defaultUser = {
        name: user?.name || "Daffa Aziz Ghiffari",
        avatar: user?.avatar || "/hyein.png",
    };

    const handleLogout = () => {
        // Here you would typically clear session/cookies
        router.push("/id");
    };

    const dropdownItems = [
        { label: "Profil Saya", href: "/id/dashboard/profile", icon: <User size={16} /> },
        { label: "Kelola Member", href: "/id/dashboard/members", icon: <Users size={16} /> },
        { label: "Kelola Industri", href: "/id/dashboard/magang", icon: <Building2 size={16} /> },
        { label: "Kelola Instansi Pendidikan", href: "/id/dashboard/pendidikan", icon: <GraduationCap size={16} /> },
    ];

    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between relative z-50">
            {/* Left Section - Sidebar Toggle + Search */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
                {/* Sidebar Toggle Button (shadcn) */}
                {showSidebarTrigger && (
                    <SidebarTrigger className="-ml-1" />
                )}

                {/* Manual Toggle (for layouts without SidebarProvider) */}
                {!showSidebarTrigger && onMenuClick && (
                    <button
                        onClick={onMenuClick}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <PanelLeft size={18} />
                    </button>
                )}

                {/* Search Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Cari menu..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Right Section - Theme, Chat, Bell, Profile */}
            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                )}

                {/* Messages */}
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MessageSquare size={20} />
                </button>

                {/* Notification Bell */}
                <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors"
                    >
                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                            {defaultUser.avatar ? (
                                <Image
                                    src={defaultUser.avatar}
                                    alt={defaultUser.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <span>{defaultUser.name.charAt(0)}</span>
                            )}
                        </div>
                        <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {defaultUser.name}
                                </p>
                            </div>
                            <div className="py-2">
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <span className="text-gray-400 group-hover:text-orange-500">
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
