"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export type FilterType = "radio" | "checkbox" | "dropdown" | "info" | "button";

export type FilterItem = {
  label: string;
  type: FilterType;
  options?: string[];
  selected?: string | string[];
};

type SidebarFilterProps = {
  filters: FilterItem[];
  onFilterChange?: (label: string, value: any) => void;
  onReset?: () => void;
};

export default function SidebarFilter({
  filters,
  onFilterChange,
  onReset,
}: SidebarFilterProps) {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>(
    filters.reduce((acc, f) => ({ ...acc, [f.label]: true }), {}),
  );

  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    filters.reduce((acc, f) => ({ ...acc, [f.label]: false }), {}),
  );

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      filters.forEach((f) => {
        const dropdown = dropdownRefs.current[f.label];
        const button = buttonRefs.current[f.label];
        if (
          dropdown &&
          !dropdown.contains(event.target as Node) &&
          button &&
          !button.contains(event.target as Node)
        ) {
          setDropdownOpen((prev) => ({ ...prev, [f.label]: false }));
        }
      });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filters]);

  const toggleOpen = (label: string) => {
    setOpenStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleDropdownSelect = (label: string, value: string) => {
    onFilterChange?.(label, value);
    setDropdownOpen((prev) => ({ ...prev, [label]: false }));
  };

  const handleCheckboxChange = (
    label: string,
    option: string,
    checked: boolean,
  ) => {
    onFilterChange?.(label, { [option]: checked });
  };

  return (
    <aside className="hidden lg:block lg:w-64 xl:w-72 sticky top-24 self-start z-10">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="space-y-0">
          {filters.map((filter) => (
            <div
              key={filter.label}
              className="border-b border-gray-200 dark:border-slate-800 transition-colors last:border-b-0"
            >
              {/* Header */}
              <button
                onClick={() => toggleOpen(filter.label)}
                className="w-full flex justify-between items-center py-4 px-4 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
              >
                <span className="font-semibold text-gray-700 text-[14px] dark:text-gray-200">
                  {filter.label}
                </span>
                {openStates[filter.label] ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                )}
              </button>

              {/* Content */}
              {openStates[filter.label] && (
                <div className="pb-4 px-4 pt-0 relative">
                  {filter.type === "radio" &&
                    filter.options?.map((opt, index) => {
                      const isChecked = filter.selected === opt;
                      const radioId = `radio-${filter.label}-${opt}-${index}`.replace(/\s/g, '-');
                      return (
                        <label
                          key={radioId}
                          htmlFor={radioId}
                          className="flex items-center space-x-3 cursor-pointer group mb-4 last:mb-0"
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              id={radioId}
                              type="radio"
                              name={filter.label}
                              value={opt}
                              checked={isChecked}
                              onChange={() => onFilterChange?.(filter.label, opt)}
                              className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-orange-500 transition-all cursor-pointer dark:border-slate-600 dark:bg-slate-950"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500 scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                          </div>
                          <span className="text-[13px] text-gray-600 dark:text-gray-400 font-medium">
                            {opt}
                          </span>
                        </label>
                      );
                    })}

                  {filter.type === "button" && filter.options && (
                    <div className="flex flex-col gap-2.5">
                      {filter.options.map((opt, index) => (
                        <button
                          key={`${opt}-${index}`}
                          onClick={() => onFilterChange?.(filter.label, opt)}
                          className={`w-fit px-4 py-1.5 text-[13px] font-medium rounded-full border transition-all
                          ${filter.selected === opt
                              ? "bg-white text-orange-600 border-orange-500 shadow-sm"
                              : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-400 dark:bg-slate-950 dark:text-gray-400 dark:border-slate-700"
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {filter.type === "checkbox" && filter.options && (
                    <div className="max-h-48 overflow-y-auto space-y-3">
                      {filter.options.map((opt, index) => {
                        const isChecked = Array.isArray(filter.selected) && filter.selected.includes(opt);
                        return (
                          <label
                            key={`${opt}-${index}`}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    filter.label,
                                    opt,
                                    e.target.checked,
                                  )
                                }
                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-0 checked:border-orange-500 transition-all cursor-pointer dark:border-slate-600 dark:bg-slate-950"
                              />
                              <Check className="absolute w-3.5 h-3.5 text-orange-600 scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                            </div>
                            <span className="text-[13px] text-gray-600 dark:text-gray-400">
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {filter.type === "dropdown" && filter.options && (
                    <button
                      ref={(el) => {
                        buttonRefs.current[filter.label] = el;
                      }}
                      onClick={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          [filter.label]: !prev[filter.label],
                        }))
                      }
                      className="flex items-center justify-between w-full h-9 px-3 py-1.5 text-[13px] rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:ring-orange-500 dark:bg-slate-950 dark:border-slate-700 dark:text-gray-200"
                    >
                      <span className="truncate">
                        {filter.selected || filter.options[0]}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0 ml-2" />
                    </button>
                  )}

                  {filter.type === "dropdown" && dropdownOpen[filter.label] && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[filter.label] = el;
                      }}
                      className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-md shadow-lg max-h-64 overflow-y-auto z-50"
                    >
                      {filter.options?.map((opt, index) => (
                        <button
                          key={`${opt}-${index}`}
                          onClick={() =>
                            handleDropdownSelect(filter.label, opt)
                          }
                          className="w-full px-3 py-2 text-left text-[13px] hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                        >
                          <span className="text-gray-700 dark:text-gray-200">
                            {opt}
                          </span>
                          {filter.selected === opt && (
                            <Check className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {filter.type === "info" && (
                    <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200 dark:bg-slate-900/50 dark:border-slate-700">
                      <p className="text-xs text-gray-500 px-4 dark:text-gray-400">
                        {filter.options?.[0]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="p-4 text-center transition-colors">
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all h-9 px-4 py-2 text-orange-600 dark:text-orange-400 hover:underline underline-offset-4"
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}