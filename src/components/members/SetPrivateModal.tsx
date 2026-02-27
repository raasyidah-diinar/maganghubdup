"use client";

import React from "react";
import { X, EyeOff } from "lucide-react";

interface SetPrivateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SetPrivateModal({ isOpen, onClose, onConfirm }: SetPrivateModalProps) {
    const [shouldRender, setShouldRender] = React.useState(isOpen);
    const [isAnimated, setIsAnimated] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => setIsAnimated(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimated(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
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
            <div className={`relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 transform ${isAnimated ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-10 pt-12">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                            <EyeOff className="text-[#E8532F]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#E8532F]">Jadikan Private?</h3>
                    </div>

                    {/* Body */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                        Profil Anda akan disembunyikan dari daftar publik dan pencarian. Anda tetap dapat mengaksesnya secara pribadi. Lanjutkan?
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-10">
                        <button
                            onClick={onClose}
                            className="text-sm font-bold text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-8 py-3 bg-[#0F172A] hover:bg-black text-white rounded-full text-sm font-bold shadow-lg shadow-gray-200 dark:shadow-none transition-all active:scale-95"
                        >
                            Ya, Sembunyikan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
