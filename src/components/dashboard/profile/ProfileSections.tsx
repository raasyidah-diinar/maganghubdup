"use client";

import { Edit2, Plus, ExternalLink, ChevronRight, MapPin, Calendar, Globe, Award, Heart, Code, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ProfileSectionProps {
    title: string;
    children: React.ReactNode;
    onEdit?: () => void;
    onAdd?: () => void;
    className?: string;
}

export function ProfileSection({ title, children, onEdit, onAdd, className = "" }: ProfileSectionProps) {
    return (
        <section className={`bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative group ${className}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{title}</h2>
                <div className="flex items-center gap-2 invisible group-hover:visible transition-all">
                    {onEdit && (
                        <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-[#E8532F] transition-colors">
                            <Edit2 size={16} />
                        </button>
                    )}
                    {onAdd && (
                        <button onClick={onAdd} className="p-1.5 text-gray-400 hover:text-[#E8532F] transition-colors">
                            <Plus size={18} />
                        </button>
                    )}
                </div>
            </div>
            {children}
        </section>
    );
}

interface ExpItemProps {
    role: string;
    company: string;
    period: string;
    location?: string;
    description: string;
    logo?: string;
    isLast?: boolean;
}

export function ExpItem({ role, company, period, location, description, logo, isLast }: ExpItemProps) {
    return (
        <div className={`flex gap-4 ${!isLast ? "mb-8 pb-8 border-b border-gray-50 dark:border-gray-700/50" : ""}`}>
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                {logo ? (
                    <Image src={logo} alt={company} fill sizes="48px" className="object-cover" />
                ) : (
                    <Briefcase className="text-gray-400" size={20} />
                )}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                            {role}
                        </h3>
                        <p className="text-[#E8532F] dark:text-orange-400 text-sm font-semibold">
                            {company}
                        </p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                        {period}
                    </span>
                </div>
                {location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <MapPin size={12} />
                        {location}
                    </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

interface EduItemProps {
    institution: string;
    degree: string;
    period: string;
    logo?: string;
    isLast?: boolean;
}

export function EduItem({ institution, degree, period, logo, isLast }: EduItemProps) {
    return (
        <div className={`flex gap-4 ${!isLast ? "mb-6" : ""}`}>
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                {logo ? (
                    <Image src={logo} alt={institution} fill sizes="48px" className="object-cover" />
                ) : (
                    <GraduationCap className="text-gray-400" size={20} />
                )}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                        {institution}
                    </h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {period}
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {degree}
                </p>
            </div>
        </div>
    );
}

export function SkillTag({ name }: { name: string }) {
    return (
        <span className="bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-orange-100/50 dark:border-orange-800/30 tracking-wide uppercase">
            {name}
        </span>
    );
}

interface ConnectionItemProps {
    name: string;
    role: string;
    avatar: string;
    isVerified?: boolean;
}

export function ConnectionItem({ name, role, avatar, isVerified }: ConnectionItemProps) {
    return (
        <div className="flex items-center gap-3 justify-between group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-700 overflow-hidden relative shrink-0">
                    <Image src={avatar} alt={name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate flex items-center gap-1">
                        {name}
                        {isVerified && <CheckCircle2 size={12} className="text-blue-500" />}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate tracking-tight">{role}</p>
                </div>
            </div>
            <button className="text-gray-300 group-hover:text-[#E8532F] transition-colors shrink-0">
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
