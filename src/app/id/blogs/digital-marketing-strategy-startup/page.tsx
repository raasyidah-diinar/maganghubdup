"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThumbsUp, MessageSquare, Share2, Loader2, Tag } from "lucide-react";
import ArticleHeader from "@/components/blog/ArticleHeader";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { BLOG_POSTS } from "@/lib/constants/blogs";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Memuat artikel...</p>
    </div>
);

export default function ArticlePage() {
    const [isLoading, setIsLoading] = useState(true);
    const post = BLOG_POSTS.find(p => p.slug === "digital-marketing-strategy-startup") || BLOG_POSTS[7];

    const relatedPosts = BLOG_POSTS
        .filter(p => p.id !== post.id)
        .slice(0, 2)
        .map(p => ({
            id: p.id,
            title: p.title,
            date: p.date,
            image: p.image,
            slug: p.slug
        }));

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <ArticleHeader
                    category={post.category}
                    title={post.title}
                    date={post.date}
                    readTime={post.readTime}
                />
                <p className="text-xl text-gray-500 dark:text-gray-400 mt-6 max-w-3xl leading-relaxed">
                    {post.description}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden shadow-xl">
                            <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-6">
                                <p>Dalam dunia startup yang kompetitif, teknik pemasaran tradisional seringkali terlalu mahal dan tidak efektif.</p>
                                <h3>Content Marketing Adalah Kunci</h3>
                                <p>Alih-alih "menjual", cobalah untuk "mengedukasi". Konten yang bernilai tinggi akan menarik audiens yang tepat secara organik dan membangun kepercayaan terhadap brand Anda.</p>
                                <h3>Manfaatkan Media Sosial Secara Organik</h3>
                                <p>Jangan buru-buru membakar uang untuk iklan. Fokuslah pada membangun komunitas yang loyal di platform yang relevan dengan target audiens Anda.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 pt-8 border-t border-gray-100 dark:border-gray-800">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-medium hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-2">
                                    <Tag size={14} />
                                    {tag.replace('#', '')}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-bold">
                                    <ThumbsUp size={20} />
                                    <span>670</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-bold">
                                    <MessageSquare size={20} />
                                    <span>28</span>
                                </button>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-4 space-y-8">
                        <AuthorCard
                            name={post.author.name}
                            role={post.author.role}
                            slug={post.author.slug}
                            avatar={post.author.avatar}
                            bio={post.author.bio}
                        />
                        <RelatedBlogs blogs={relatedPosts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
