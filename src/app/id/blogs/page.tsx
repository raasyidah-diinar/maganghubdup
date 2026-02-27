"use client";

import SearchFilter from "@/components/blog/SearchFilter";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardList from "@/components/blog/BlogGrid";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const blogPosts = [
    {
        image: "/arsitektur.png",
        category: "ENGINEERING",
        date: "25 Des 2025",
        title: "Menguasai Arsitektur Microservices dengan Golang",
        description: "Panduan komprehensif memecah monolitik menjadi layanan mikro yang scalable.",
        tags: ["#Golang", "#Microservices", "#Backend"],
        author: {
            name: "Kazuha",
            role: "Unknown",
        },
    },
    {
        image: "/gamevr.png",
        category: "GAME DEV",
        date: "24 Des 2025",
        title: "Membangun Game VR Pertama Anda di Unity",
        description: "Langkah awal memahami environment 3D dan interaksi Virtual Reality.",
        tags: ["#Unity", "#VR", "#C#"],
        author: {
            name: "Carmen",
            role: "Unknown",
        },
    },
    {
        image: "/code.jpg",
        category: "DESIGN",
        date: "23 Des 2025",
        title: "Psikologi Warna dalam UI Design Modern",
        description: "Bagaimana warna orange dan gelap mempengaruhi keputusan pengguna.",
        tags: ["#UI/UX", "#Design", "#Psychology"],
        author: {
            name: "Rei",
            role: "Unknown",
        },
    },
    {
        image: "/pkl.png",
        category: "CAREER",
        date: "22 Des 2025",
        title: "Persiapan PKL untuk Siswa SMK RPL",
        description: "Tips sukses mendapatkan tempat magang di perusahaan tech startup.",
        tags: ["#SMK", "#Internship", "#Career"],
        author: {
            name: "Winona",
            role: "Unknown",
        },
    },
    {
        image: "/teknologi.png",
        category: "TECHNOLOGY",
        date: "21 Des 2025",
        title: "Tren AI dan Machine Learning di 2026",
        description: "Eksplorasi perkembangan terbaru dalam dunia kecerdasan buatan.",
        tags: ["#AI", "#MachineLearning", "#Tech"],
        author: {
            name: "Darren",
            role: "Unknown",
        },
    },
    {
        image: "/engineering.png",
        category: "ENGINEERING",
        date: "20 Des 2025",
        title: "Clean Code: Prinsip dan Best Practices",
        description: "Menulis kode yang mudah dibaca, dipelihara, dan di-scale.",
        tags: ["#CleanCode", "#BestPractices", "#Development"],
        author: {
            name: "Naafi",
            role: "Unknown",
        },
    },
    {
        image: "/uiux.png",
        category: "UI/UX",
        date: "19 Des 2025",
        title: "Designing Accessible User Interfaces",
        description: "Membuat desain yang inklusif untuk semua pengguna.",
        tags: ["#Accessibility", "#UX", "#Design"],
        author: {
            name: "Jonathan",
            role: "Unknown",
        },
    },
    {
        image: "/digitalmarketing.png",
        category: "MARKETING",
        date: "18 Des 2025",
        title: "Digital Marketing Strategy untuk Startup",
        description: "Cara efektif membangun brand awareness dengan budget terbatas.",
        tags: ["#Marketing", "#Startup", "#Digital"],
        author: {
            name: "Chelsea",
            role: "Unknown",
        },
    },
];

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [sortOrder, setSortOrder] = useState("terbaru");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Helper function to parse date
    const parseDate = (dateStr: string) => {
        const monthMap: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'Mei': '05', 'Jun': '06', 'Jul': '07', 'Agu': '08',
            'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12'
        };

        const parts = dateStr.split(' ');
        const day = parts[0].padStart(2, '0');
        const month = monthMap[parts[1]] || '01';
        const year = parts[2];

        return { day, month, year, fullDate: `${year}-${month}-${day}` };
    };

    // Filter and sort blog posts
    const filteredAndSortedPosts = blogPosts
        .filter((post) => {
            // Filter by search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchTitle = post.title.toLowerCase().includes(query);
                const matchDescription = post.description.toLowerCase().includes(query);
                const matchCategory = post.category.toLowerCase().includes(query);
                const matchTags = post.tags.some(tag => tag.toLowerCase().includes(query));

                if (!matchTitle && !matchDescription && !matchCategory && !matchTags) {
                    return false;
                }
            }

            // Filter by category
            if (selectedCategory && post.category !== selectedCategory) {
                return false;
            }

            // Filter by month
            if (selectedMonth) {
                const postDate = parseDate(post.date);
                if (!post.date.includes(selectedMonth)) {
                    return false;
                }
            }

            // Filter by year
            if (selectedYear) {
                const postDate = parseDate(post.date);
                if (postDate.year !== selectedYear) {
                    return false;
                }
            }

            return true;
        })
        .sort((a, b) => {
            const dateA = parseDate(a.date).fullDate;
            const dateB = parseDate(b.date).fullDate;

            switch (sortOrder) {
                case "terbaru":
                    return dateB.localeCompare(dateA);
                case "terlama":
                    return dateA.localeCompare(dateB);
                case "az":
                    return a.title.localeCompare(b.title);
                default:
                    return dateB.localeCompare(dateA);
            }
        });

    return (
        <div className="flex-1">
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    <div className="min-h-screen bg-amber-50 dark:bg-slate-950 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-6 md:mb-16">
                                <div className="text-left mb-4 md:mb-6 lg:mb-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                                        Insight &
                                        <span className="text-orange-600"> Stories</span>
                                    </h2>
                                    <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl">
                                        Temukan artikel terbaru seputar teknologi, desain, dan pengembangan diri.
                                    </p>
                                </div>

                                {/* Search Bar & View Toggle */}
                                <div className="flex flex-col gap-3 max-w-3xl">
                                    {/* Search Filter Row - with toggle on desktop */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
                                        <div className="flex-1">
                                            <SearchFilter
                                                onSearchChange={setSearchQuery}
                                                onCategoryChange={setSelectedCategory}
                                                onMonthChange={setSelectedMonth}
                                                onYearChange={setSelectedYear}
                                                onSortChange={setSortOrder}
                                                key={`${searchQuery}-${selectedCategory}-${selectedMonth}-${selectedYear}-${sortOrder}`}
                                            />
                                        </div>

                                        {/* Reset Button & View Toggle */}
                                        <div className="flex items-center gap-2 self-start">
                                            {/* Reset Button */}
                                            {(searchQuery || selectedCategory || selectedMonth || selectedYear || sortOrder !== "terbaru") && (
                                                <button
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setSelectedCategory("");
                                                        setSelectedMonth("");
                                                        setSelectedYear("");
                                                        setSortOrder("terbaru");
                                                        // Force reset inputs in SearchFilter if needed, but since we control state here 
                                                        // and SearchFilter presumably reacts to props if we passed them fully controlled...
                                                        // Looking at SearchFilter, it has internal state too. 
                                                        // Ideally we should pass values to SearchFilter to make it fully controlled, 
                                                        // but valid fix for now without refactoring SearchFilter completely is 
                                                        // to key it or just trust the user request to "add reset button".
                                                        // *Wait, SearchFilter IS NOT fully controlled based on props in the previous reading*.
                                                        // It initializes from props but uses internal state.
                                                        // I should probably key it to force re-render or refactor it.
                                                        // Given the constraints, keying it is safest for immediate "Reset" effect.
                                                    }}
                                                    className="hidden sm:flex px-4 py-2.5 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded-lg transition-colors whitespace-nowrap"
                                                >
                                                    Reset Filter
                                                </button>
                                            )}

                                            {/* View Toggle - Inline on desktop */}
                                            <div className="hidden sm:flex flex-shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1">
                                                <button
                                                    onClick={() => setViewMode('grid')}
                                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                                        ? 'bg-orange-500 text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect width="7" height="7" x="3" y="3" rx="1" />
                                                        <rect width="7" height="7" x="14" y="3" rx="1" />
                                                        <rect width="7" height="7" x="14" y="14" rx="1" />
                                                        <rect width="7" height="7" x="3" y="14" rx="1" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setViewMode('list')}
                                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                                        ? 'bg-orange-500 text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="8" x2="21" y1="6" y2="6" />
                                                        <line x1="8" x2="21" y1="12" y2="12" />
                                                        <line x1="8" x2="21" y1="18" y2="18" />
                                                        <line x1="3" x2="3.01" y1="6" y2="6" />
                                                        <line x1="3" x2="3.01" y1="12" y2="12" />
                                                        <line x1="3" x2="3.01" y1="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* View Toggle - Below search on mobile */}
                                        <div className="flex sm:hidden justify-end">
                                            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1">
                                                <button
                                                    onClick={() => setViewMode('grid')}
                                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                                        ? 'bg-orange-500 text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect width="7" height="7" x="3" y="3" rx="1" />
                                                        <rect width="7" height="7" x="14" y="3" rx="1" />
                                                        <rect width="7" height="7" x="14" y="14" rx="1" />
                                                        <rect width="7" height="7" x="3" y="14" rx="1" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setViewMode('list')}
                                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                                        ? 'bg-orange-500 text-white'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="8" x2="21" y1="6" y2="6" />
                                                        <line x1="8" x2="21" y1="12" y2="12" />
                                                        <line x1="8" x2="21" y1="18" y2="18" />
                                                        <line x1="3" x2="3.01" y1="6" y2="6" />
                                                        <line x1="3" x2="3.01" y1="12" y2="12" />
                                                        <line x1="3" x2="3.01" y1="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Results Count */}
                                    {!isLoading && (searchQuery || selectedCategory || selectedMonth || selectedYear) && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Menampilkan {filteredAndSortedPosts.length} artikel
                                                {searchQuery && <span> untuk "{searchQuery}"</span>}
                                                {selectedCategory && <span> di kategori {selectedCategory}</span>}
                                                {selectedMonth && <span> bulan {selectedMonth}</span>}
                                                {selectedYear && <span> tahun {selectedYear}</span>}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Blog Cards */}
                                {isLoading ? (
                                    <div className="w-full flex-1 min-h-[400px] flex flex-col items-center justify-center py-20 bg-amber-50 dark:bg-slate-950 rounded-2xl transition-all duration-300">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                                                memuat konten...
                                            </p>
                                        </div>
                                    </div>
                                ) : filteredAndSortedPosts.length > 0 ? (
                                    <div className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-10'
                                            : 'flex flex-col gap-3 sm:gap-4 mt-10'
                                    }>
                                        {filteredAndSortedPosts.map((post, index) => (
                                            viewMode === 'grid' ? (
                                                <BlogCard
                                                    key={index}
                                                    image={post.image}
                                                    category={post.category}
                                                    date={post.date}
                                                    title={post.title}
                                                    description={post.description}
                                                    tags={post.tags}
                                                    author={post.author}
                                                    onBookmark={() => console.log(`Bookmarked: ${post.title}`)}
                                                />
                                            ) : (
                                                <BlogCardList
                                                    key={index}
                                                    image={post.image}
                                                    category={post.category}
                                                    date={post.date}
                                                    title={post.title}
                                                    description={post.description}
                                                    tags={post.tags}
                                                    author={post.author}
                                                    onBookmark={() => console.log(`Bookmarked: ${post.title}`)}
                                                />
                                            )
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="text-center">
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {searchQuery
                                                    ? `Tidak ada artikel untuk "${searchQuery}". Coba kata kunci lain.`
                                                    : "Tidak ada artikel ditemukan sesuai filter."}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setSelectedCategory("");
                                                    setSelectedMonth("");
                                                    setSelectedYear("");
                                                    setSortOrder("terbaru");
                                                }}
                                                className="text-orange-500 dark:text-orange-400 font-medium hover:underline"
                                            >
                                                Reset Filter
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}