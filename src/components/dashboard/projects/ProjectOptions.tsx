"use client";

import { Archive, Type, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectOptionsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenArchive: () => void;
    onOpenAbout: () => void;
}

export default function ProjectOptions({ isOpen, onClose, onOpenArchive, onOpenAbout }: ProjectOptionsProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-20" onClick={onClose}></div>
            <div className="absolute top-12 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-700 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 flex flex-col gap-1">
                    <button
                        onClick={() => {
                            onOpenArchive();
                            onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#475569] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors font-medium"
                    >
                        <div className="flex items-center gap-3">
                            <Archive size={18} className="text-[#64748b]" strokeWidth={2} />
                            <span>Lihat Arsip</span>
                        </div>
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-[11px] font-extrabold w-[22px] h-[22px] flex items-center justify-center rounded-full leading-none">2</span>
                    </button>

                    <button
                        onClick={() => {
                            onOpenAbout();
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#475569] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors font-medium"
                    >
                        <Type size={18} className="text-[#64748b]" strokeWidth={2} />
                        <span>Tentang Proyek</span>
                    </button>

                    <button
                        onClick={() => router.push("/id/dashboard/projects")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#475569] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={18} className="text-[#64748b]" strokeWidth={2} />
                        <span>Keluar Proyek</span>
                    </button>
                </div>
            </div>
        </>
    );
}
