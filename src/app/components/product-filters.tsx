"use client";

import type { AvailabilityFilter, SortOption } from "@/lib/types";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;

  priceBounds: { min: number; max: number };
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;

  availability: AvailabilityFilter;
  onAvailabilityChange: (value: AvailabilityFilter) => void;

  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceBounds,
  priceRange,
  onPriceRangeChange,
  availability,
  onAvailabilityChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6 bg-[#FDFDFD] rounded-2xl p-4 md:p-5 h-fit">
      <div>
        <label className="text-xs md:text-sm font-medium text-[#111111] block mb-2">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full bg-[#F0F2F6] rounded-xl px-3 py-2 text-xs md:text-sm text-[#111111] outline-none"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>

      <div>
        <label className="text-xs md:text-sm font-medium text-[#111111] block mb-2">
          Category
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onCategoryChange("all")}
            className={`text-left text-xs md:text-sm px-3 py-1.5 rounded-lg transition-colors
              ${
                selectedCategory === "all"
                  ? "bg-[#111111] text-white"
                  : "bg-[#F0F2F6] text-[#111111] hover:bg-[#EFF2F5]"
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`text-left text-xs md:text-sm px-3 py-1.5 rounded-lg transition-colors
                ${
                  selectedCategory === category
                    ? "bg-[#111111] text-white"
                    : "bg-[#F0F2F6] text-[#111111] hover:bg-[#EFF2F5]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs md:text-sm font-medium text-[#111111] block mb-2">
          Price Range (${priceRange.min} - ${priceRange.max})
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={priceBounds.min}
            max={priceRange.max}
            value={priceRange.min}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                min: Number(e.target.value),
              })
            }
            className="w-1/2 bg-[#F0F2F6] rounded-xl px-2 py-1.5 text-xs text-[#111111] outline-none"
          />
          <span className="text-[#CCCCCC] text-xs">to</span>
          <input
            type="number"
            min={priceRange.min}
            max={priceBounds.max}
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                max: Number(e.target.value),
              })
            }
            className="w-1/2 bg-[#F0F2F6] rounded-xl px-2 py-1.5 text-xs text-[#111111] outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs md:text-sm font-medium text-[#111111] block mb-2">
          Availability
        </label>
        <div className="flex flex-col gap-1.5">
          {(
            [
              { value: "all", label: "All" },
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Unavailable" },
            ] as { value: AvailabilityFilter; label: string }[]
          ).map((option) => (
            <button
              key={option.value}
              onClick={() => onAvailabilityChange(option.value)}
              className={`text-left text-xs md:text-sm px-3 py-1.5 rounded-lg transition-colors
                ${
                  availability === option.value
                    ? "bg-[#111111] text-white"
                    : "bg-[#F0F2F6] text-[#111111] hover:bg-[#EFF2F5]"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}