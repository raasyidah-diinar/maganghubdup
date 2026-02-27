"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateGroupModal({
    isOpen,
    onClose,
    onSuccess,
}: CreateGroupModalProps) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isAnimated, setIsAnimated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => setIsAnimated(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimated(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsSubmitting(false);
                setName("");
                setDescription("");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate creation delay
        setTimeout(() => {
            window.alert("Grup berhasil dibuat!");
            setIsSubmitting(false);
            onSuccess?.();
            onClose();
        }, 1500);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isAnimated ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 transform ${isAnimated
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 translate-y-4"
                    }`}
            >
                {/* Header */}
                <div className="px-7 pt-8 pb-4 flex items-start justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Tambah Grup Baru
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Buat ruang diskusi baru untuk tim Anda.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-7 pb-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[15px] font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Nama Grup
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Contoh: Engineering Team"
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[15px] font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Deskripsi
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Jelaskan tujuan grup ini..."
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white resize-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 text-[16px] font-bold text-white rounded-2xl shadow-xl shadow-orange-200 dark:shadow-none transition-all flex items-center justify-center ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#E8532F] to-[#FF6B35] hover:opacity-90 active:scale-[0.98]"
                                }`}
                        >
                            {isSubmitting ? "Proses..." : "Buat Grup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
