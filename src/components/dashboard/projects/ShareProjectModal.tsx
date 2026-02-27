"use client";

import { X, Link as LinkIcon, ChevronDown, Check, Ban } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Member {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "Admin" | "Member" | "Owner";
}

interface ShareProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    members: Member[];
}

export default function ShareProjectModal({ isOpen, onClose, members }: ShareProjectModalProps) {
    const [email, setEmail] = useState("");
    const [activeRolePopover, setActiveRolePopover] = useState<string | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Check if the current user ("Me") has permission to manage roles
    const currentUser = members.find(m => m.id === "me");
    const canManageRoles = currentUser?.role === "Admin" || currentUser?.role === "Owner";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setActiveRolePopover(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-gray-800 w-full max-w-[480px] rounded-[24px] shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 flex justify-between items-center">
                    <h2 className="text-xl font-extrabold text-[#111827] dark:text-white">
                        Share Project
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 pb-6 space-y-6">
                    {/* Add Member Row */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Masukkan email atau nama..."
                                className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-400 font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className={`h-full px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center gap-1.5 text-xs text-gray-400 ${canManageRoles ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors' : 'cursor-not-allowed'}`}>
                                <span>Member</span>
                                <ChevronDown size={14} className={canManageRoles ? "" : "text-gray-300"} />
                            </div>
                        </div>
                        <button className="px-6 py-2.5 bg-[#ff6300] text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-100 dark:shadow-none hover:bg-orange-600 transition-all active:scale-95">
                            Share
                        </button>
                    </div>

                    {/* Share with Link */}
                    <div className="flex items-center justify-between py-5 border-y border-gray-50 dark:border-gray-700/50">
                        <div>
                            <h4 className="text-sm font-bold text-[#111827] dark:text-white">Share with link</h4>
                            <p className="text-[11px] text-gray-400 font-medium tracking-tight">Anyone with the link can view</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 dark:border-gray-700 rounded-xl text-[11px] font-extrabold text-[#1e293b] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                            <LinkIcon size={14} />
                            <span>Copy Link</span>
                        </button>
                    </div>

                    {/* Members List */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#111827] dark:text-white">Members</h4>
                        <div className="space-y-4">
                            {members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <Image src={member.avatar} alt={member.name} width={40} height={40} className="object-cover" />
                                        </div>
                                        <div>
                                            <h5 className="text-[13px] font-bold text-[#111827] dark:text-gray-100 leading-tight">
                                                {member.name} {member.id === "me" ? "(Me)" : ""}
                                            </h5>
                                            <p className="text-[11px] text-gray-400 font-medium">{member.email}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div
                                            onClick={() => canManageRoles && setActiveRolePopover(member.id === activeRolePopover ? null : member.id)}
                                            onMouseEnter={() => !canManageRoles && setActiveRolePopover(member.id)}
                                            onMouseLeave={() => !canManageRoles && setActiveRolePopover(null)}
                                            className={`flex items-center gap-1.5 text-[11px] font-bold text-gray-400/60 dark:text-gray-500 ${canManageRoles ? 'cursor-pointer group' : 'cursor-help'}`}
                                        >
                                            <span className="group-hover:text-gray-600 transition-colors uppercase tracking-wider">{member.role}</span>
                                            <ChevronDown size={12} className="text-gray-300" />
                                        </div>

                                        {/* Restriction Popover */}
                                        {activeRolePopover === member.id && (
                                            <div
                                                ref={popoverRef}
                                                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-[110] animate-in fade-in slide-in-from-right-2 duration-200"
                                            >
                                                {/* Arrow */}
                                                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700 rotate-45 transform"></div>

                                                <div className="relative z-10 space-y-3">
                                                    <h6 className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-widest">AKSES ROLE</h6>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-orange-600">Admin:</p>
                                                        <p className="text-xs font-bold text-[#1e293b] dark:text-gray-300">Member:</p>
                                                    </div>
                                                    <div className="pt-2 border-t border-gray-50 dark:border-gray-700/50">
                                                        <p className="text-[10px] font-semibold text-red-400 leading-normal italic">
                                                            Anda tidak memiliki izin untuk mengubah role.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

