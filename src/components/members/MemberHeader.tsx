"use client";

import React from "react";
import Image from "next/image";
import { MapPin, CheckCircle2, MessageCircle, UserPlus, Share2, Download, X, EyeOff } from "lucide-react";
import MemberListModal from "./MemberListModal";
import { Member } from "@/lib/constants/members";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import MemberCVTemplate from "./MemberCVTemplate";
import SetPrivateModal from "./SetPrivateModal";

interface MemberHeaderProps {
    member: Member;
    isOwnProfile?: boolean;
}

export default function MemberHeader({ member, isOwnProfile = false }: MemberHeaderProps) {
    const {
        name,
        avatar,
        banner = "/pemandangan1.png",
        role,
        location,
        isVerified = false,
        blogsCount = 1,
        stats,
        followerList = [],
        followingList = [],
    } = member;

    const [showFollowers, setShowFollowers] = React.useState(false);
    const [showFollowing, setShowFollowing] = React.useState(false);
    const [showSetPrivateModal, setShowSetPrivateModal] = React.useState(false);
    const [isDownloading, setIsDownloading] = React.useState(false);

    const followers = stats?.followers || 0;
    const following = stats?.following || 0;

    const handleDownloadCV = async () => {
        setIsDownloading(true);
        const element = document.getElementById("cv-template");
        if (!element) {
            setIsDownloading(false);
            return;
        }

        try {
            // Give even more time for fonts/images to stabilize
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2,
                cacheBust: true,
                skipFonts: false
            });

            const pdf = new jsPDF("p", "pt", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgProps = pdf.getImageProperties(dataUrl);
            // pixelRatio: 2 means 1 CSS px = 2 image px
            const totalContentHeightInPx = imgProps.height / 2;
            const pxToPt = pdfWidth / 800; // Template is 800px wide
            const pdfPageHeightInPx = pdfHeight / pxToPt;

            // Get all sections relative to the root template
            const sections = Array.from(element.querySelectorAll('.cv-section')) as HTMLElement[];
            const sectionBounds = sections.map(sec => ({
                top: sec.offsetTop,
                bottom: sec.offsetTop + sec.offsetHeight,
                forceBreak: sec.classList.contains('force-page-break')
            }));

            let currentYInPx = 0;
            let pageNum = 1;

            while (currentYInPx < totalContentHeightInPx) {
                if (pageNum > 1) pdf.addPage();

                let sliceHeightInPx = pdfPageHeightInPx;
                const pageBottomInPx = currentYInPx + sliceHeightInPx;

                // Priority 1: Check for sections that REQUIRE a page break (e.g., Education)
                const forcedBreak = sectionBounds.find(sb =>
                    sb.forceBreak && sb.top > currentYInPx && sb.top < (pageBottomInPx - 10)
                );

                if (forcedBreak) {
                    sliceHeightInPx = forcedBreak.top - currentYInPx;
                } else {
                    // Priority 2: Check if any normal section is being cut in half
                    // Added -20px safety margin to ensure we don't just leave a title at the bottom
                    const cutSection = sectionBounds.find(sb =>
                        sb.top < (pageBottomInPx - 20) && sb.bottom > (pageBottomInPx - 20)
                    );

                    if (cutSection && cutSection.top > (currentYInPx + 50)) {
                        // Section starts on this page but ends after it. Push to next page.
                        if (cutSection.bottom - cutSection.top < pdfPageHeightInPx) {
                            sliceHeightInPx = cutSection.top - currentYInPx;
                        }
                    }
                }

                pdf.addImage(
                    dataUrl,
                    'PNG',
                    0,
                    -currentYInPx * pxToPt,
                    pdfWidth,
                    totalContentHeightInPx * pxToPt
                );

                currentYInPx += sliceHeightInPx;
                pageNum++;

                if (pageNum > 20) break;
            }

            pdf.save(`CV_${name.replace(/\s/g, "_")}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    return (
        <div className="w-full relative">
            {/* Orange Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-orange-500 z-20" />

            {/* Banner */}
            <div className="h-40 md:h-52 relative bg-gray-200 dark:bg-gray-700">
                <Image
                    src={banner}
                    alt="Banner"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Area */}
            <div className="px-8 pb-10 relative">
                {/* Overlapping Avatar */}
                <div className="absolute -top-16 left-8 w-32 h-32 md:w-36 md:h-36 bg-white dark:bg-gray-800 rounded-full p-1 shadow-xl z-20">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                        <Image
                            src={avatar}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Main Info Row */}
                <div className="pt-24 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
                                {isVerified && <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-500 text-white" />}
                            </div>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{role}</p>
                            <div className="flex items-center gap-1.5 text-gray-400 font-medium text-sm">
                                <MapPin size={16} />
                                <span>{location}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadCV}
                            disabled={isDownloading}
                            className={`flex items-center gap-2 px-6 py-2.5 border border-orange-500 text-orange-600 rounded-2xl font-bold text-sm transition-all ${isDownloading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-50 active:scale-95"
                                }`}
                        >
                            <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
                            {isDownloading ? "Downloading..." : "Download CV"}
                        </button>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-1.5 cursor-default">
                            <span className="font-bold text-gray-900 dark:text-white">{blogsCount}</span>
                            <span className="text-gray-400">Blog</span>
                        </div>
                        <div
                            className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-2 py-1 rounded-lg transition-colors"
                            onClick={() => setShowFollowers(true)}
                        >
                            <span className="font-bold text-gray-900 dark:text-white">{followers}</span>
                            <span className="text-gray-400">Pengikut</span>
                        </div>
                        <div
                            className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-2 py-1 rounded-lg transition-colors"
                            onClick={() => setShowFollowing(true)}
                        >
                            <span className="font-bold text-gray-900 dark:text-white">{following}</span>
                            <span className="text-gray-400">Diikuti</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        {isOwnProfile ? (
                            <>
                                <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-100 dark:shadow-none flex items-center gap-2">
                                    Edit Profil
                                </button>
                                <button
                                    onClick={() => setShowSetPrivateModal(true)}
                                    className="px-10 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                                >
                                    <EyeOff size={18} />
                                    Set Private
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="px-10 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all shadow-lg shadow-orange-100 dark:shadow-none">
                                    Ikuti
                                </button>
                                <button className="px-10 py-3 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full font-bold transition-all">
                                    Kirim Pesan
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden Template for PDF Export */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', opacity: 0, pointerEvents: 'none' }}>
                <MemberCVTemplate member={member} id="cv-template" />
            </div>

            {/* Modals */}
            <MemberListModal
                isOpen={showFollowers}
                onClose={() => setShowFollowers(false)}
                title="Pengikut"
                members={followerList}
            />
            <MemberListModal
                isOpen={showFollowing}
                onClose={() => setShowFollowing(false)}
                title="Diikuti"
                members={followingList}
            />
            <SetPrivateModal
                isOpen={showSetPrivateModal}
                onClose={() => setShowSetPrivateModal(false)}
                onConfirm={() => {
                    console.log("Profile set to private");
                    setShowSetPrivateModal(false);
                }}
            />
        </div>
    );
}
