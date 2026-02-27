"use client";

import React from "react";
import Image from "next/image";
import { Member } from "@/lib/constants/members";

interface MemberCVTemplateProps {
    member: Member;
    id: string;
}

export default function MemberCVTemplate({ member, id }: MemberCVTemplateProps) {
    return (
        <div
            id={id}
            className="relative w-[800px] bg-white p-12 text-[#1E293B] font-sans leading-relaxed flex flex-col gap-12"
        >
            {/* Header Section */}
            <div className="cv-section flex justify-between items-start border-b-2 border-orange-500 pb-8">
                <div className="space-y-4 flex-1">
                    <h1 className="text-5xl font-black text-[#0F172A] uppercase tracking-tight">
                        {member.name}
                    </h1>
                    <p className="text-2xl font-bold text-orange-600">
                        {member.role}
                    </p>
                    <div className="flex items-center gap-6 text-[#64748B] text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500 font-bold">📍</span>
                            {member.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500 font-bold">✉️</span>
                            {member.name.toLowerCase().replace(/\s/g, '.')}@gmail.com
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="w-40 h-48 bg-gray-100 rounded-2xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Summary Section */}
            {member.summary && (
                <div className="cv-section space-y-4">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Summary
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <p className="text-[#475569] text-base leading-relaxed text-justify">
                        {member.summary}
                    </p>
                </div>
            )}

            {/* Internship Section */}
            {member.internshipActivities && member.internshipActivities.length > 0 && (
                <div className="cv-section space-y-6">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Internship & Organization
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-4">
                        {member.internshipActivities.map((activity, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <p className="font-bold text-lg text-[#0F172A]">{activity.company}</p>
                                <p className="text-sm font-bold text-[#94A3B8]">{activity.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Section */}
            {member.experience && member.experience.length > 0 && (
                <div className="cv-section space-y-8">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Experience
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-10">
                        {member.experience.map((exp, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-[#0F172A]">{exp.title}</h3>
                                        <p className="text-base font-bold text-[#475569]">{exp.company}</p>
                                    </div>
                                    <p className="text-sm font-bold text-[#94A3B8] whitespace-nowrap">{exp.period}</p>
                                </div>
                                <p className="text-[#64748B] text-sm leading-relaxed pl-4 border-l-2 border-gray-100">
                                    • {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education Section */}
            {member.education && member.education.length > 0 && (
                <div className="cv-section force-page-break space-y-6">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Education
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-6">
                        {member.education.map((edu, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-bold text-lg text-[#0F172A]">{edu.school}</p>
                                    <p className="text-base text-[#64748B] font-medium">{edu.degree}</p>
                                    {edu.description && (
                                        <p className="text-xs italic text-[#64748B] pt-1">{edu.description}</p>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-[#94A3B8]">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Awards Section */}
            {member.awards && member.awards.length > 0 && (
                <div className="cv-section space-y-6">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Honors & Awards
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-6">
                        {member.awards.map((award, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-bold text-lg text-[#0F172A]">{award.title}</p>
                                    <p className="text-base text-[#64748B] font-medium">{award.issuer}</p>
                                </div>
                                <p className="text-sm font-bold text-[#94A3B8]">{award.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Volunteering Section */}
            {member.volunteering && member.volunteering.length > 0 && (
                <div className="cv-section space-y-6">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Volunteering
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-6">
                        {member.volunteering.map((vol, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="font-bold text-lg text-[#0F172A]">{vol.role}</p>
                                        <p className="text-base font-bold text-rose-600">{vol.organization}</p>
                                    </div>
                                    <p className="text-sm font-bold text-[#94A3B8] whitespace-nowrap">{vol.period}</p>
                                </div>
                                <p className="text-[#64748B] text-sm leading-relaxed pl-4 border-l-2 border-gray-100 italic">
                                    {vol.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Portfolio / Projects Section */}
            {member.projects && member.projects.length > 0 && (
                <div className="cv-section space-y-6">
                    <h2 className="text-xl font-black text-orange-600 uppercase tracking-widest flex items-center gap-3">
                        Portfolio / Projects
                        <div className="h-[2px] flex-1 bg-gray-100" />
                    </h2>
                    <div className="space-y-8">
                        {member.projects.map((project, idx) => (
                            <div key={idx} className="space-y-2">
                                <h3 className="text-lg font-black text-[#0F172A]">{project.title}</h3>
                                <p className="text-[#475569] text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-2 pt-1 font-bold text-[#94A3B8] text-xs uppercase">
                                    Skills: {project.tech.join(" • ")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
