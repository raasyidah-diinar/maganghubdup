"use client";

import { Calendar, Bookmark, Tag } from "lucide-react";

type BlogCardListProps = {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  onBookmark?: () => void;
  isLoading?: boolean;
};

export default function BlogCardList({
  image,
  category,
  date,
  title,
  description,
  tags,
  author,
  onBookmark,
  isLoading = false,
}: BlogCardListProps) {
  if (isLoading) return null;
  // Generate initials from name
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-row h-52">
      {/* Image - Smaller fixed width on left */}
      <div className="relative w-80 h-full flex-shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-500 text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>

      {/* Content - Fills remaining space */}
      <div className="flex-1 px-8 py-6 flex flex-col justify-between">
        <div>
          {/* Date */}
          <div className="flex items-center gap-2 text-orange-500 text-sm mb-3">
            <Calendar size={16} />
            <span>{date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-orange-600 dark:hover:text-orange-500 transition-colors cursor-pointer line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author & Bookmark */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <span className="text-orange-600 dark:text-orange-500 font-bold text-xs">
                {getInitials(author.name)}
              </span>
            </div>

            {/* Author Info */}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {author.role}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={onBookmark}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bookmark size={18} className="text-gray-400 dark:text-gray-500 hover:text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
}