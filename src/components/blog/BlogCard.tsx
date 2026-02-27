"use client";

import { Calendar, Bookmark, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BlogCardProps = {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  onBookmark?: () => void;
  isLoading?: boolean;
};

export default function BlogCard({
  image,
  category,
  date,
  title,
  description,
  tags,
  slug,
  author,
  onBookmark,
  isLoading = false,
}: BlogCardProps) {
  if (isLoading) return null;
  // Generate initials from name
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const searchParams = useSearchParams();
  const isDashboardView = searchParams.get('view') === 'dashboard';
  const detailLink = isDashboardView ? `/id/blogs/${slug}?view=dashboard` : `/id/blogs/${slug}`;

  return (
    <Link href={detailLink} className="block h-full">
      <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border-t-4 border-orange-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category & Date Row */}
          <div className="flex flex-col gap-2 mb-3">
            <span className="w-fit bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {category}
            </span>

            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: Author & Bookmark */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-500 font-bold text-xs">
                  {getInitials(author.name)}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {author.name}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  {author.role}
                </span>
              </div>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onBookmark?.();
              }}
              className="text-gray-300 dark:text-gray-600 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
            >
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}