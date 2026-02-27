"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyName: string;
}

export default function ContactModal({
    isOpen,
    onClose,
    companyName,
}: ContactModalProps) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isAnimated, setIsAnimated] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => setIsAnimated(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimated(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsSending(false);
                setSubject("");
                setMessage("");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate sending delay
        setTimeout(() => {
            window.alert("Pesan berhasil dikirim ke tempat magang!");
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
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimated ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 transform ${isAnimated
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-4"
                    }`}
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-start justify-between">
                    <div className="flex gap-4 items-start">
                        <div className="flex items-center justify-center flex-shrink-0 text-orange-600 dark:text-orange-400">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Hubungi {companyName}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Kirimkan pertanyaan Anda kepada pihak tempat magang.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Subjek
                        </label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Masukkan subjek pesan"
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Pesan
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tuliskan pesan Anda di sini..."
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSending}
                            className="px-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors min-w-[100px] border border-gray-200 dark:border-gray-700"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSending}
                            className={`px-8 py-3 text-sm font-bold text-white rounded-2xl shadow-lg shadow-orange-200 dark:shadow-none transition-all min-w-[140px] flex items-center justify-center ${isSending
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-600 hover:bg-orange-700"
                                }`}
                        >
                            {isSending ? "Mengirim..." : "Kirim Pesan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
