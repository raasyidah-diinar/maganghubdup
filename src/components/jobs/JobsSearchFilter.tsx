"use client";

import { Search, MapPin, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
  onLocationChange?: (location: string) => void;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
};

const CITIES = [
  { value: "Bandung", label: "Bandung", subLabel: "Kota Bandung, Jawa Barat" },
  { value: "Jakarta", label: "Jakarta", subLabel: "DKI Jakarta" },
  { value: "Jakarta Pusat", label: "Jakarta Pusat", subLabel: "Kota Jakarta Pusat, DKI Jakarta" },
  { value: "Jakarta Selatan", label: "Jakarta Selatan", subLabel: "Kota Jakarta Selatan, DKI Jakarta" },
  { value: "Malang", label: "Malang", subLabel: "Kota Malang, Jawa Timur" },
  { value: "Surabaya", label: "Surabaya", subLabel: "Kota Surabaya, Jawa Timur" },
  { value: "Tangerang", label: "Tangerang", subLabel: "Kota Tangerang, Banten" },
];

export default function JobSearchFilter({ onLocationChange, onSearchChange }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleLocationSelect = (city: typeof CITIES[0]) => {
    setLocation(city.label);
    setLocationSearch("");
    setIsDropdownOpen(false);
    if (onLocationChange) {
      onLocationChange(city.value);
    }
  };

  const handleClearLocation = () => {
    setLocation("");
    setLocationSearch("");
    if (onLocationChange) {
      onLocationChange("");
    }
  };

  const filteredCities = CITIES.filter(
    (city) =>
      city.label.toLowerCase().includes(locationSearch.toLowerCase()) ||
      city.subLabel.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        {/* Search Input - Lebih panjang */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari Nama Perusahaan..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 
            rounded-lg bg-gray-50 
            dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 
            placeholder-gray-500 dark:placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-orange-500 
            dark:focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Location Dropdown Custom */}
        <div className="relative" ref={dropdownRef}>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10" size={20} />

          {/* Input Display */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 
            dark:border-gray-600 rounded-lg 
            bg-gray-50 dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 
            hover:border-gray-400 dark:hover:border-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500 
            dark:focus:ring-orange-400 focus:border-transparent 
            transition-all cursor-pointer flex items-center"
          >
            <span className={location ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
              {location || "Pilih Kota/Kabupaten"}
            </span>
          </div>

          {/* Clear Button */}
          {location && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearLocation();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10"
            >
              <X size={18} />
            </button>
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
              {/* Search inside dropdown */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Cari kota..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* City List */}
              <div className="overflow-y-auto max-h-60">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <div
                      key={city.value}
                      onClick={() => handleLocationSelect(city)}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        {city.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {city.subLabel}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Kota tidak ditemukan
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}