"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface ProjectDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        background: string;
    };
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 w-full max-w-[420px] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header Image Area */}
                <div className="relative h-32 w-full">
                    <img
                        src={project.background || "/pemandangan.png"}
                        alt="Project Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Close Button overlapping image */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
                    <h2 className="text-lg font-bold font-plus-jakarta-sans text-[#1e293b] dark:text-white mb-4">Tentang Proyek</h2>

                    <div className="space-y-4">
                        {/* Nama Proyek */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-[#94a3b8] tracking-widest uppercase">Nama Proyek</label>
                            <input
                                type="text"
                                value={project.title}
                                readOnly
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[#475569] font-semibold text-[13px] focus:outline-none cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 transition-colors"
                            />
                        </div>

                        {/* Deskripsi */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-[#94a3b8] tracking-widest uppercase">Deskripsi</label>
                            <textarea
                                readOnly
                                value="Tambahkan deskripsi singkat mengenai proyek ini..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[#94a3b8] font-medium text-[13px] focus:outline-none cursor-not-allowed resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500 transition-colors"
                            />
                        </div>

                        {/* Dibuat Oleh */}
                        <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] font-extrabold text-[#94a3b8] tracking-widest uppercase">Dibuat Oleh</label>
                            <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700">
                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                                    <Image
                                        src="/martin.png"
                                        alt="Fatkul Amri"
                                        width={32}
                                        height={32}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <div className="text-[13px] font-bold text-[#1e293b] dark:text-white leading-tight">Fatkul Amri</div>
                                    <div className="text-[11px] font-medium text-[#94a3b8] dark:text-gray-400">@fatkulamri</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
