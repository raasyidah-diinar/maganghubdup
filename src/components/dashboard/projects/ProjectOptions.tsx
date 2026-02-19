"use client";

import { Archive, Type, Image as ImageIcon, Settings } from "lucide-react";

interface ProjectOptionsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenArchive: () => void;
}

export default function ProjectOptions({ isOpen, onClose, onOpenArchive }: ProjectOptionsProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-20" onClick={onClose}></div>
            <div className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Opsi Project</h3>
                </div>

                <div className="p-1">
                    <button
                        onClick={() => {
                            onOpenArchive();
                            onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Archive size={16} className="text-gray-400 group-hover:text-orange-500" />
                            <span>Lihat Arsip</span>
                        </div>
                        <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition-colors">
                        <Type size={16} className="text-gray-400 group-hover:text-orange-500" />
                        <span>Ganti Judul Project</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition-colors">
                        <ImageIcon size={16} className="text-gray-400 group-hover:text-orange-500" />
                        <span>Ganti Background</span>
                    </button>

                    <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>

                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                        <Settings size={16} />
                        <span>Pengaturan Board</span>
                    </button>
                </div>
            </div>
        </>
    );
}
