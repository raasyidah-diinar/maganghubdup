"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="border-t-2 border-orange-500 bg-white shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6 md:py-10">
                    <div className="max-w-3xl text-sm leading-relaxed text-gray-600">
                        <p>
                            Kami menggunakan cookies untuk menganalisis trafik dan meningkatkan kenyamanan Anda. Dengan melanjutkan, berarti Anda menyetujui penggunaan cookies sesuai Kebijakan Privasi kami.{" "}
                            <Link href="/id/privacy-policy" className="font-bold text-orange-600 hover:underline">
                                Kebijakan Privasi
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-6">
                        <button
                            onClick={handleDecline}
                            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                        >
                            Tolak
                        </button>
                        <button
                            onClick={handleAccept}
                            className="rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-10 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-[0.98]"
                        >
                            Setujui Semua
                        </button>
                        <button
                            onClick={handleClose}
                            className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
