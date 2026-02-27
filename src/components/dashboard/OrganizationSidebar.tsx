"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    Briefcase,
    Users,
    Users2,
    FileText,
    GraduationCap,
    Building2,
    ClipboardCheck,
    BarChart3,
    Plus,
    Check,
    ChevronsUpDown,
    Layers,
    FolderKanban,
    CreditCard,
    MessageSquare,
    Mail,
    Search,
    BookOpen,
    Bookmark,
    UserCircle,
    HelpCircle,
    ShieldCheck,
    School,
    UserCheck,
    Inbox,
    Send,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Organization {
    id: string;
    name: string;
    type: string;
    role: string;
    avatar?: string;
}

interface OrganizationSidebarProps {
    orgName?: string;
    orgId?: string;
    orgSlug?: string;
    organizations?: Organization[];
}

export default function OrganizationSidebar({
    orgName = "SMK Telkom 20 Mal...",
    orgId = "2",
    orgSlug = "smk-telkom-mana",
    organizations = [
        {
            id: "2",
            name: "SMK Telkom 20 Malang",
            type: "Pendidikan, Industry",
            role: "Owner",
            avatar: "/smktelkom.png"
        }
    ]
}: OrganizationSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const basePath = `/id/organizations/${orgSlug}/${orgId}`;

    const currentOrg = organizations.find(o => o.id === orgId) || organizations[1]; // Fallback to SMK Telkom if not found
    const displayName = currentOrg.name;
    const displayAvatar = currentOrg.avatar || "/smktelkom.png";

    const navigationSections = [
        {
            title: "DASHBOARD INSTITUSI",
            items: [
                { label: "Dashboard", href: `${basePath}/dashboard`, icon: School },
                { label: "Program Magang", href: `${basePath}/programs/institusi`, icon: Layers },
                { label: "Data Mahasiswa", href: `${basePath}/students`, icon: GraduationCap },
            ]
        },
        {
            title: "ADMINISTRASI",
            items: [
                { label: "Members", href: `${basePath}/admin/members`, icon: Users },
                { label: "Groups", href: `${basePath}/admin/groups`, icon: Building2 },
                { label: "LogBook", href: `${basePath}/admin/logbook`, icon: FileText },
                { label: "Penilaian", href: `${basePath}/admin/grading`, icon: ClipboardCheck },
                { label: "Laporan Institusi", href: `${basePath}/admin/reports`, icon: BarChart3 },
            ]
        },
        {
            title: "DASHBOARD INDUSTRI",
            items: [
                { label: "Dashboard", href: `${basePath}/dashboard`, icon: LayoutGrid },
                { label: "Lowongan", href: `${basePath}/industri/jobs`, icon: Briefcase },
                { label: "Seleksi Pelamar", href: `${basePath}/industri/applicants`, icon: UserCheck },
            ]
        },
        {
            title: "MANAJEMEN INTERNAL",
            items: [
                { label: "Kelola Member", href: `${basePath}/admin/members`, icon: ShieldCheck },
                { label: "Group", href: `${basePath}/internal/groups`, icon: Building2 },
                { label: "Project", href: `${basePath}/internal/projects`, icon: FolderKanban },
                { label: "LogBook", href: `${basePath}/internal/logbook`, icon: FileText },
                { label: "Penilaian", href: `${basePath}/internal/grading`, icon: ClipboardCheck },
                { label: "Billing & Invoices", href: `${basePath}/internal/billing`, icon: CreditCard },
            ]
        },
        {
            title: "KOMUNIKASI",
            items: [
                { label: "Dashboard", href: `${basePath}/komunikasi/dashboard`, icon: LayoutGrid },
                { label: "Surat Masuk", href: `${basePath}/komunikasi/inbox`, icon: Inbox },
                { label: "Surat Keluar", href: `${basePath}/komunikasi/outbox`, icon: Send },
                { label: "Template", href: `${basePath}/komunikasi/templates`, icon: Layers },
                { label: "Setting", href: `${basePath}/komunikasi/settings`, icon: Settings },
            ]
        },
        {
            title: "EKSPLORASI",
            items: [
                { label: "Lowongan", href: `${basePath}/eksplorasi/jobs?view=dashboard`, icon: Search },
                { label: "Tempat Magang", href: `${basePath}/eksplorasi/magang?view=dashboard`, icon: Building2 },
                { label: "Instansi Pendidikan", href: `${basePath}/eksplorasi/pendidikan?view=dashboard`, icon: GraduationCap },
                { label: "Anggota", href: `${basePath}/eksplorasi/members`, icon: Users },
                { label: "Blog", href: `${basePath}/eksplorasi/blog?view=dashboard`, icon: BookOpen },
                { label: "Favorit", href: `${basePath}/eksplorasi/favorites`, icon: Bookmark },
            ]
        },
        {
            title: "PENGATURAN",
            items: [
                { label: "Profil Instansi", href: `${basePath}/settings/profile`, icon: UserCircle },
                { label: "Pusat Bantuan", href: `/id/help`, icon: HelpCircle },
            ]
        },
    ];


    return (
        <Sidebar collapsible="icon" className="relative z-[40] border-r border-gray-100 dark:border-gray-800">
            <SidebarHeader className="h-16 flex items-center px-3 border-b border-gray-200 dark:border-gray-700">
                <SidebarMenu>
                    <SidebarMenuItem>
                        {!isMounted ? (
                            <div className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
                                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded" />
                                    <div className="h-2 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all group data-[state=open]:border-orange-200 dark:data-[state=open]:border-orange-800 data-[state=open]:bg-orange-50/30 dark:data-[state=open]:bg-orange-950/10 shadow-sm"
                                    >
                                        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-white">
                                            <Image
                                                src={displayAvatar}
                                                alt={displayName}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left group-data-[collapsible=icon]:hidden">
                                            <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate uppercase tracking-tight">
                                                {displayName}
                                            </p>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate font-medium uppercase tracking-wider">
                                                Dashboard Institusi
                                            </p>
                                        </div>
                                        <ChevronsUpDown size={14} className="text-gray-400 flex-shrink-0 group-data-[collapsible=icon]:hidden" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-80 p-0 rounded-[24px] border border-gray-100 dark:border-gray-700 shadow-2xl overflow-hidden"
                                    side="right"
                                    align="start"
                                    sideOffset={12}
                                >
                                    {/* Member Section */}
                                    <div className="p-4 bg-white dark:bg-gray-800">
                                        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-3 tracking-[0.15em] px-1">
                                            MEMBER
                                        </p>
                                        <DropdownMenuItem
                                            onClick={() => router.push("/id/dashboard")}
                                            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer focus:bg-gray-50 focus:outline-none group opacity-80 hover:opacity-100"
                                        >
                                            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                <Image
                                                    src="/hyein.png"
                                                    alt="User"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate">
                                                    Raasyidah Diinar Kaamilah
                                                </p>
                                                <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium truncate">
                                                    raasyidahdiinar
                                                </p>
                                            </div>
                                        </DropdownMenuItem>
                                    </div>

                                    {/* Organizations Section */}
                                    <div className="p-4 pt-1 bg-white dark:bg-gray-800">
                                        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-3 tracking-[0.15em] px-1">
                                            ORGANISASI
                                        </p>
                                        <div className="space-y-0.5">
                                            {organizations.map((org) => {
                                                const isCurrent = org.id === orgId;
                                                return (
                                                    <DropdownMenuItem
                                                        key={org.id}
                                                        onClick={() => {
                                                            if (!isCurrent) {
                                                                router.push(`/id/organizations/${slugify(org.name)}/${org.id}/dashboard`);
                                                            }
                                                        }}
                                                        className={`w-full flex items-center gap-3 p-1.5 rounded-2xl transition-all cursor-pointer focus:outline-none ${isCurrent ? "bg-[#FFF8F1] dark:bg-orange-950/20 opacity-100" : "opacity-80 hover:opacity-100 hover:bg-gray-50/50 focus:bg-gray-50"}`}
                                                    >
                                                        <div className={`relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-white dark:bg-gray-900 border ${isCurrent ? "border-orange-100 dark:border-orange-900/50" : "border-gray-100 dark:border-gray-700"}`}>
                                                            {org.avatar ? (
                                                                <Image
                                                                    src={org.avatar}
                                                                    alt={org.name}
                                                                    fill
                                                                    className="object-contain p-1.5"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                                                                    {org.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate leading-tight">
                                                                {org.name}
                                                            </p>
                                                            <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium truncate">
                                                                {org.type} • {org.role}
                                                            </p>
                                                        </div>
                                                        {isCurrent && <Check size={20} className="text-[#FA7A2E] flex-shrink-0 mr-1" />}
                                                    </DropdownMenuItem>
                                                )
                                            })}

                                            <div className="px-1 py-3">
                                                <Link
                                                    href="/id/tambah-organisasi"
                                                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-200 transition-all"
                                                >
                                                    <Plus size={18} className="text-gray-400" />
                                                    Tambah Organisasi
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {isMounted && navigationSections.map((section) => (
                    <SidebarGroup key={section.title} className="mb-4">
                        <SidebarGroupLabel className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-2 px-3">
                            {section.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    const itemPath = item.href.split('?')[0];
                                    const isActive = pathname === itemPath || pathname?.startsWith(itemPath + "/");
                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={`flex items-center gap-3 px-3 py-5 rounded-xl transition-all duration-200 ${isActive
                                                    ? "bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] !text-white shadow-lg shadow-orange-500/30 font-bold scale-[1.02]"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-orange-600"
                                                    }`}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon size={20} className={isActive ? "!text-white" : ""} />
                                                    <span className={`text-[13px] font-semibold ${isActive ? "!text-white" : ""}`}>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-50 dark:border-gray-800">
                <Link href="/id" className="flex items-center gap-3 group">
                    <div className="relative w-9 h-9 flex-shrink-0 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <Image
                            src="/maganghublogo.webp"
                            alt="MagangHub"
                            width={22}
                            height={22}
                            className="object-contain"
                        />
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <span className="text-[15px] font-black bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] bg-clip-text text-transparent block leading-tight">
                            MagangHub
                        </span>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">
                            Platform Magang
                        </span>
                    </div>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}
