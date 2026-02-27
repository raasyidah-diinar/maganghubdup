"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    Loader2,
    Briefcase,
    GraduationCap,
    Trophy,
    Heart,
    Code2,
    Languages,
    Award,
    FolderKanban,
    Calendar,
    MapPin,
    ExternalLink
} from "lucide-react";
import MemberHeader from "@/components/members/MemberHeader";
import MemberSidebar from "@/components/members/MemberSidebar";
import { MEMBERS_DUMMY } from "@/lib/constants/members";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Memuat profil anggota...</p>
    </div>
);

const SectionWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{title}</h3>
        {children}
    </div>
);

export default function MemberDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const memberId = parseInt(params.id as string);
    const member = MEMBERS_DUMMY.find((m) => m.id === memberId) || MEMBERS_DUMMY[0];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-20">
            {/* Content Layout */}
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Unified Card (Header + Content) */}
                        <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 relative">
                            {/* Header Section */}
                            <MemberHeader member={member} />

                            {/* Detailed Content Sections */}
                            <div className="p-8 md:p-12 space-y-14">
                                {/* Summary */}
                                {member.summary && (
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Summary</h3>
                                        </div>
                                        <div className="pl-6">
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[13px] font-medium">
                                                {member.summary}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Internship Activities */}
                                {member.internshipActivities && member.internshipActivities.length > 0 && (
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Internship Activities</h3>
                                        </div>
                                        <div className="pl-6 space-y-5">
                                            {member.internshipActivities.map((activity, idx) => (
                                                <div key={idx} className="flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                                            <div className="relative w-7 h-7">
                                                                <Image src={activity.logo} alt={activity.company} fill className="object-contain" />
                                                            </div>
                                                        </div>
                                                        <p className="font-bold text-[#1E293B] dark:text-white text-[13px]">{activity.company}</p>
                                                    </div>
                                                    <span className="px-4 py-1.5 bg-[#F1F5F9] dark:bg-gray-800 text-[#64748B] dark:text-gray-400 rounded-lg text-[10px] font-bold">
                                                        {activity.period}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {member.experience && member.experience.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Experience</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.experience.map((exp, idx) => (
                                                <div key={idx} className="flex gap-6 items-start">
                                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm group hover:border-orange-200 transition-colors">
                                                        <Briefcase size={22} className="text-orange-500" />
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{exp.title}</h4>
                                                            <span className="px-4 py-1.5 bg-[#F1F5F9] dark:bg-gray-800 text-[#64748B] dark:text-gray-400 rounded-full text-[10px] font-bold whitespace-nowrap">
                                                                {exp.period}
                                                            </span>
                                                        </div>
                                                        <p className="text-orange-600 dark:text-orange-400 font-bold text-xs">
                                                            {exp.company} • {exp.location}
                                                        </p>
                                                        <div className="pt-1">
                                                            <p className="italic text-[#64748B] dark:text-gray-400 text-xs leading-relaxed">
                                                                {exp.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Education */}
                                {member.education && member.education.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Education</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.education.map((edu, idx) => (
                                                <div key={idx} className="flex gap-6 items-start">
                                                    <div className="w-12 h-12 bg-[#F8FAFC] dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-50 dark:border-gray-700">
                                                        <GraduationCap size={22} className="text-orange-500" />
                                                    </div>
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{edu.school}</h4>
                                                            <span className="text-orange-500 dark:text-orange-400 text-[11px] font-bold whitespace-nowrap">
                                                                {edu.period}
                                                            </span>
                                                        </div>
                                                        <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{edu.degree}</p>
                                                        <div className="pt-2">
                                                            <p className="italic text-[#64748B] dark:text-gray-400 text-[12px] leading-relaxed">
                                                                {edu.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Awards */}
                                {member.awards && member.awards.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Honors & Awards</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.awards.map((award, idx) => (
                                                <div key={idx} className="flex gap-6 items-start">
                                                    <div className="w-12 h-12 bg-[#FFFBEB] dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-50 dark:border-amber-900/30">
                                                        <Trophy size={22} className="text-amber-500" />
                                                    </div>
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{award.title}</h4>
                                                            <span className="text-orange-500 dark:text-orange-400 text-[11px] font-bold whitespace-nowrap">
                                                                {award.date}
                                                            </span>
                                                        </div>
                                                        <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{award.issuer}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Volunteering */}
                                {member.volunteering && member.volunteering.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Volunteering</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.volunteering.map((vol, idx) => (
                                                <div key={idx} className="flex gap-6 items-start">
                                                    <div className="w-12 h-12 bg-[#FFF1F2] dark:bg-rose-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-rose-50 dark:border-rose-900/30">
                                                        <Heart size={22} className="text-rose-500" />
                                                    </div>
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{vol.role}</h4>
                                                            <span className="text-[#94A3B8] dark:text-gray-400 text-[11px] font-bold whitespace-nowrap">
                                                                {vol.period}
                                                            </span>
                                                        </div>
                                                        <p className="text-rose-600 dark:text-rose-400 font-bold text-[13px]">
                                                            {vol.organization}
                                                        </p>
                                                        <div className="pt-2">
                                                            <p className="italic text-[#64748B] dark:text-gray-400 text-[12px] leading-relaxed">
                                                                {vol.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Technical Skills */}
                                {member.skills && member.skills.length > 0 && (
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Technical Skills</h3>
                                        </div>
                                        <div className="pl-6 flex flex-wrap gap-2.5">
                                            {member.skills.map((skill, idx) => (
                                                <span key={idx} className="px-5 py-2.5 bg-[#F1F5F9] dark:bg-gray-800 text-[#475569] dark:text-gray-300 rounded-full text-xs font-bold border border-transparent hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-orange-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {member.languages && member.languages.length > 0 && (
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Languages</h3>
                                        </div>
                                        <div className="pl-6 space-y-4">
                                            {member.languages.map((lang, idx) => (
                                                <div key={idx} className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700/50 pb-4 last:border-0 last:pb-0">
                                                    <p className="font-bold text-[#1E293B] dark:text-white text-[14px]">{lang.language}</p>
                                                    <p className="text-[#94A3B8] dark:text-gray-400 text-xs font-medium">{lang.proficiency}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Licenses & Certifications */}
                                {member.certifications && member.certifications.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Licenses & Certifications</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.certifications.map((cert, idx) => (
                                                <div key={idx} className="flex gap-6 items-start">
                                                    <div className="w-12 h-12 bg-[#F0FDF4] dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-50 dark:border-emerald-900/30">
                                                        <Award size={22} className="text-emerald-500" />
                                                    </div>
                                                    <div className="space-y-1 flex-1">
                                                        <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white">{cert.title}</h4>
                                                        <p className="text-[#64748B] dark:text-gray-400 font-medium text-[13px]">{cert.issuer}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Portfolio / Projects */}
                                {member.projects && member.projects.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Portfolio / Projects</h3>
                                        </div>
                                        <div className="pl-6 space-y-10">
                                            {member.projects.map((project, idx) => (
                                                <div key={idx} className="flex gap-6 items-start group cursor-pointer" onClick={() => window.open('https://github.com', '_blank')}>
                                                    <div className="w-12 h-12 bg-[#F8FAFC] dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-50 dark:border-gray-700 group-hover:border-orange-200 transition-colors">
                                                        <ExternalLink size={22} className="text-orange-500" />
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white group-hover:text-orange-600 transition-colors">{project.title}</h4>
                                                            <ExternalLink size={16} className="text-[#94A3B8] group-hover:text-orange-500" />
                                                        </div>
                                                        <p className="text-[#64748B] dark:text-gray-400 text-xs leading-relaxed max-w-2xl">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex items-center gap-2 pt-1">
                                                            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-tight">Skills:</span>
                                                            <div className="flex gap-3">
                                                                {project.tech.map((t, i) => (
                                                                    <span key={i} className="text-[11px] font-bold text-[#64748B] dark:text-gray-400">
                                                                        • {t}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* My Blogs */}
                                {member.blogs && member.blogs.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="border-l-4 border-orange-500 pl-5">
                                                <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">My Blogs</h3>
                                            </div>
                                            <button className="text-[13px] font-bold text-orange-500 hover:text-orange-600 transition-colors">Lihat semua</button>
                                        </div>
                                        <div className="pl-6 space-y-6">
                                            {member.blogs.map((blog, idx) => (
                                                <div key={idx} className="flex gap-6 items-center p-3 -ml-3 rounded-[24px] hover:bg-[#F8FAFC] dark:hover:bg-gray-700/50 transition-all cursor-pointer group" onClick={() => router.push(`/id/blog/${idx + 1}`)}>
                                                    <div className="w-24 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-sm">
                                                        <Image src="/pemandangan1.png" alt="Blog" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="space-y-1.5 flex-1">
                                                        <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white group-hover:text-orange-600 transition-colors">{blog.title}</h4>
                                                        <div className="flex items-center gap-2 text-[#94A3B8] dark:text-gray-400">
                                                            <Calendar size={14} />
                                                            <span className="text-[12px] font-medium">{blog.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-1">
                        <MemberSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
