"use client";

import React, { useState } from "react";
import { Star, Send, User, PencilLine } from "lucide-react";
import Image from "next/image";

interface Review {
    id: number;
    name: string;
    role: string;
    rating: number;
    comment: string;
    timeAgo: string;
    avatar?: string;
    initials: string;
}

export default function CompanyReviews() {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: 1,
            name: "Budi Santoso",
            role: "Frontend Intern",
            rating: 5,
            comment: "Mentor sangat suportif dan lingkungan kerjanya nyaman banget untuk belajar.",
            timeAgo: "1 bulan lalu",
            initials: "BS",
        },
    ]);

    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0 || !comment.trim()) return;

        const newReview: Review = {
            id: Date.now(),
            name: "Siswa Magang", // Default name for now
            role: "Intern",
            rating: newRating,
            comment: comment,
            timeAgo: "Baru saja",
            initials: "SM",
        };

        setReviews([newReview, ...reviews]);
        setNewRating(0);
        setComment("");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Rating Summary Card */}
            <div className="bg-orange-50/50 dark:bg-orange-950/20 rounded-[32px] p-8 border border-orange-100 dark:border-orange-900/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Rating</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Berdasarkan ulasan siswa magang sebelumnya</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl md:text-5xl font-extrabold text-orange-500">4.8</span>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={20}
                                        className={star <= 5 ? "fill-orange-500 text-orange-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">12 Ulasan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Write Review Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-l-4 border-l-orange-500 border-t border-r border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-1">
                    <PencilLine className="text-gray-400" size={18} />
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Tulis Pengalaman Magang Kamu</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] mb-3 ml-7.5">Bagikan pengalamanmu agar membantu siswa lain.</p>

                <form onSubmit={handleSubmit} className="space-y-3.5 ml-7.5">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Beri Rating</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        size={20}
                                        className={
                                            star <= (hoverRating || newRating)
                                                ? "fill-orange-500 text-orange-500"
                                                : "text-gray-200 dark:text-gray-700"
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Ulasan</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Ceritakan pengalamanmu..."
                            className="w-full min-h-[80px] p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-[13px] text-gray-700 dark:text-gray-300"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={newRating === 0 || !comment.trim()}
                            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-orange-500/10 flex items-center gap-2"
                        >
                            <span>Kirim Ulasan</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-4 duration-500"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold text-lg">
                                    {review.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{review.role}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{review.timeAgo}</span>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={14}
                                    className={star <= review.rating ? "fill-orange-500 text-orange-500" : "text-gray-200"}
                                />
                            ))}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
