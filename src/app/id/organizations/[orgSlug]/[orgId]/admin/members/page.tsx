"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    Search,
    UserPlus,
    ChevronDown,
    ExternalLink,
    ShieldCheck,
    Shield,
    User,
    Filter,
    Check,
    X,
    Mail,
    MoreHorizontal,
    Loader2
} from "lucide-react";

interface Member {
    id: number;
    name: string;
    username: string;
    avatar?: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
    joinedAt: string;
}

const initialMembers: Member[] = [
    {
        id: 1,
        name: "Raasyidah Diinar Kaamilah",
        username: "@raasyidahdiinar",
        avatar: "/hyein.png",
        role: "OWNER",
        joinedAt: "1 Agu 2025",
    },
];

const roleConfig: Record<Member["role"], { styles: string; icon: any }> = {
    OWNER: {
        styles: "text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800",
        icon: ShieldCheck
    },
    ADMIN: {
        styles: "text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800",
        icon: Shield
    },
    MEMBER: {
        styles: "text-slate-600 bg-slate-50 border-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700",
        icon: User
    },
};

const roleOptions = ["Semua Role", "Owner", "Admin", "Member"];
const sortOptions = ["Terbaru", "Terlama", "A - Z"];
const inviteRoleOptions: Member["role"][] = ["MEMBER", "ADMIN", "OWNER"];

function CustomDropdown({
    options,
    value,
    onChange,
    icon,
    fullWidth = false,
    position = "bottom",
}: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    position?: "top" | "bottom";
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className={fullWidth ? "w-full relative" : "relative"} ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 transition-all ${fullWidth ? "w-full justify-between" : "hover:border-gray-300"} ${open ? "ring-2 ring-[#E8532F] border-transparent" : ""}`}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span>{value}</span>
                </div>
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className={`absolute right-0 ${position === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5"} bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1 ${fullWidth ? "w-full" : "w-44"}`}>
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                            <span>{opt}</span>
                            {value === opt && <Check size={14} className="text-[#E8532F]" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Invite Modal ────────────────────────────────────────────────────────────
interface InviteModalProps {
    onClose: () => void;
    onInvite: (email: string, role: Member["role"]) => void;
}

function InviteModal({ onClose, onInvite }: InviteModalProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Member["role"]>("MEMBER");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit() {
        if (!email.trim()) { setError("Email tidak boleh kosong."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Format email tidak valid."); return; }
        setLoading(true);
        setTimeout(() => {
            onInvite(email.trim(), role);
            setLoading(false);
            onClose();
        }, 800);
    }

    function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleBackdrop}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="flex items-start justify-between px-6 pt-6 pb-4">
                    <div>
                        <h2 className="text-[17px] font-semibold text-[#1e293b] dark:text-white">
                            Undang Anggota Baru
                        </h2>
                        <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">
                            Kirim undangan bergabung ke email calon anggota.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 pb-6 space-y-4">
                    <div>
                        <label className="block text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Alamat Email
                        </label>
                        <div className="relative">
                            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="invite-email"
                                id="invite-email"
                                autoComplete="off"
                                placeholder="nama@perusahaan.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                className={`w-full pl-9 pr-4 py-2.5 text-[13px] bg-white dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8532F] focus:border-transparent transition ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
                            />
                        </div>
                        {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
                    </div>
                    {/* Role */}
                    <div>
                        <label className="block text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Peran (Role)
                        </label>
                        <CustomDropdown
                            options={["Member", "Admin", "Owner"]}
                            value={role.charAt(0) + role.slice(1).toLowerCase()}
                            onChange={(v) => setRole(v.toUpperCase() as Member["role"])}
                            fullWidth={true}
                            position="top"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 bg-[#E8532F] hover:bg-[#d44a28] disabled:opacity-70 text-white text-[14px] font-medium rounded-xl transition-colors mt-2"
                    >
                        {loading ? "Mengirim..." : "Kirim Undangan"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function OrganizationMembersPage() {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua Role");
    const [sort, setSort] = useState("Terbaru");
    const [showInviteModal, setShowInviteModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium tracking-wide">Memuat Daftar Anggota...</p>
            </div>
        );
    }

    function handleInvite(email: string, role: Member["role"]) {
        const username = "@" + email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const today = new Date();
        const joinedAt = today.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
        const newMember: Member = {
            id: Date.now(),
            name: "User " + email.split("@")[0],
            username,
            role,
            joinedAt,
        };
        setMembers((prev) => [newMember, ...prev]);
    }

    const filtered = members.filter((m) => {
        const matchSearch =
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.username.toLowerCase().includes(search.toLowerCase());
        const matchRole =
            roleFilter === "Semua Role" || m.role === roleFilter.toUpperCase();
        return matchSearch && matchRole;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sort === "A - Z") return a.name.localeCompare(b.name);
        if (sort === "Terlama") return a.id - b.id;
        return b.id - a.id;
    });

    return (
        <>
            {showInviteModal && (
                <InviteModal
                    onClose={() => setShowInviteModal(false)}
                    onInvite={handleInvite}
                />
            )}

            <div className="max-w-[1200px] mx-auto px-6 py-5 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-[22px] font-bold text-[#1e293b] dark:text-white tracking-tight">
                            Anggota Organisasi
                        </h1>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                            Kelola peran dan akses anggota di{" "}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                {members.length}
                            </span>{" "}
                            total akun.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#E8532F] hover:bg-[#d44a28] text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200 dark:shadow-none"
                    >
                        <UserPlus size={16} />
                        Undang Anggota
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama, email, atau username..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-[13px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        />
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <CustomDropdown
                            options={roleOptions}
                            value={roleFilter}
                            onChange={setRoleFilter}
                            icon={<Filter size={13} className="text-gray-400" />}
                        />
                        <CustomDropdown
                            options={sortOptions}
                            value={sort}
                            onChange={setSort}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-[2fr_1fr_1fr_60px] px-6 py-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Profil Anggota</span>
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Peran / Role</span>
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Tanggal Bergabung</span>
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] text-right">Aksi</span>
                    </div>

                    {sorted.length === 0 ? (
                        <div className="py-16 text-center text-[13px] text-gray-400 dark:text-gray-500">
                            Tidak ada anggota ditemukan.
                        </div>
                    ) : (
                        sorted.map((member, i) => {
                            const Config = roleConfig[member.role];
                            return (
                                <div
                                    key={member.id}
                                    className={`grid grid-cols-[2fr_1fr_1fr_60px] items-center px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40 ${i > 0 ? "border-t border-gray-50 dark:border-gray-700/50" : ""}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                            {member.avatar ? (
                                                <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#1e293b] dark:text-white leading-tight">{member.name}</p>
                                            <p className="text-[12px] text-gray-400 dark:text-gray-500">{member.username}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${Config.styles}`}>
                                            <Config.icon size={12} className="flex-shrink-0" />
                                            {member.role}
                                        </span>
                                    </div>

                                    <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">{member.joinedAt}</p>

                                    <div className="flex justify-end gap-1">
                                        <button className="p-2 text-gray-400 hover:text-[#E8532F] hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg transition-colors">
                                            <ExternalLink size={15} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                            <MoreHorizontal size={15} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}
