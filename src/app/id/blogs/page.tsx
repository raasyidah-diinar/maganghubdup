"use client";

import SearchFilter from "@/components/blog/SearchFilter";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardList from "@/components/blog/BlogGrid";
import { BLOG_POSTS } from "@/lib/constants/blogs";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import { usePathname, useSearchParams } from "next/navigation";

export default function Page() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    const isDashboardView = view === "dashboard";

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

    const triggerLoading = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        triggerLoading();
    };

    const handleCategory = (category: string) => {
        setSelectedCategory(category);
        triggerLoading();
    };

    const handleMonth = (month: string) => {
        setSelectedMonth(month);
        triggerLoading();
    };

    const handleYear = (year: string) => {
        setSelectedYear(year);
        triggerLoading();
    };

    const handleSort = (sort: string) => {
        setSortOrder(sort);
        triggerLoading();
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedMonth("");
        setSelectedYear("");
        setSortOrder("terbaru");
        triggerLoading();
    };

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
    const filteredAndSortedPosts = BLOG_POSTS
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

    const pageContent = (
        <main className={`flex-1 ${isDashboardView ? "overflow-y-auto" : ""}`}>
            <div className={`min-h-screen ${isDashboardView ? "bg-white dark:bg-slate-900" : "bg-amber-50 dark:bg-slate-950"} py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8`}>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4 md:mb-8">
                        <div className="text-left mb-4 md:mb-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                                Insight &
                                <span className="text-orange-600"> Stories</span>
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl">
                                Temukan artikel terbaru seputar teknologi, desain, dan pengembangan diri.
                            </p>
                        </div>

                        {/* Search bar, filters and toggle icons in one row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
                            <div className="flex-1 flex flex-wrap sm:flex-nowrap items-center gap-3">
                                <SearchFilter
                                    onSearchChange={handleSearch}
                                    onCategoryChange={handleCategory}
                                    onMonthChange={handleMonth}
                                    onYearChange={handleYear}
                                    onSortChange={handleSort}
                                    smallButtons={true}
                                    currentSearch={searchQuery}
                                    currentCategory={selectedCategory}
                                    currentMonth={selectedMonth}
                                    currentYear={selectedYear}
                                    currentSort={sortOrder}
                                />

                                {/* Reset Button */}
                                {(searchQuery || selectedCategory || selectedMonth || selectedYear || sortOrder !== "terbaru") && (
                                    <button
                                        onClick={handleReset}
                                        className="px-2 py-1.5 text-[10px] font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* View Toggle Icons - Pushed to Right */}
                            <div className="flex-shrink-0 flex items-center gap-2 self-end sm:self-center ml-auto">
                                <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid'
                                            ? 'bg-orange-500 text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="7" height="7" x="3" y="3" rx="1" />
                                            <rect width="7" height="7" x="14" y="3" rx="1" />
                                            <rect width="7" height="7" x="14" y="14" rx="1" />
                                            <rect width="7" height="7" x="3" y="14" rx="1" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'list'
                                            ? 'bg-orange-500 text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <div className="w-full flex-1 min-h-[400px] flex flex-col items-center justify-start py-20 bg-amber-50 dark:bg-slate-950 rounded-2xl transition-all duration-300">
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
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-4'
                                : 'flex flex-col gap-3 sm:gap-4 mt-4'
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
                                        slug={post.slug}
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
                                        slug={post.slug}
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
        </main>
    );

    return (
        <div className={isDashboardView ? "" : "bg-white dark:bg-gray-900"}>
            {pageContent}
        </div>
    );
}
