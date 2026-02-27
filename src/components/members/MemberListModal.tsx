"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface MemberListModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    members: {
        id?: number;
        name: string;
        role: string;
        avatar: string;
    }[];
    onMemberClick?: (id: number) => void;
}

export default function MemberListModal({ isOpen, onClose, title, members, onMemberClick }: MemberListModalProps) {
    const [shouldRender, setShouldRender] = React.useState(isOpen);
    const [isAnimated, setIsAnimated] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Small delay to ensure the DOM is ready for the transition
            const timer = setTimeout(() => setIsAnimated(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimated(false);
            const timer = setTimeout(() => setShouldRender(false), 300); // Match duration-300
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform ${isAnimated ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}>
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* List Container */}
                <div className="max-height-[60vh] overflow-y-auto p-2">
                    {members.length > 0 ? (
                        <div className="space-y-1">
                            {members.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer group text-left"
                                    onClick={() => {
                                        if (onMemberClick && member.id !== undefined) {
                                            onMemberClick(member.id);
                                        }
                                    }}
                                >
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm flex-shrink-0">
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-orange-600 transition-colors truncate">
                                            {member.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 text-sm">Belum ada daftar untuk ditampilkan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
