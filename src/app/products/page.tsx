"use client";

import { useMemo, useState } from "react";

import { allProducts, getAllCategories, getPriceRange } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import type { AvailabilityFilter, SortOption } from "@/lib/types";

import ProductsGrid from "@/src/app/components/products-grid";
import ProductFilters from "@/src/app/components/product-filters";
import Pagination from "@/src/app/components/pagination";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const categories = useMemo(() => getAllCategories(), []);
  const priceBounds = useMemo(() => getPriceRange(), []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(priceBounds);
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = query.trim()
      ? searchProducts(query, allProducts)
      : [...allProducts];

    if (category !== "all") {
      result = result.filter((p) => (p.category ?? "Other") === category);
    }

    result = result.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    if (availability !== "all") {
      result = result.filter((p) =>
        availability === "available" ? p.available : !p.available
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [query, category, priceRange, availability, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function updateFilter<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setCurrentPage(1);
    };
  }

  return (
    <main className="min-h-screen bg-[#F0F2F6] px-[4%] py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-lg md:text-2xl font-semibold text-[#111111]">
          All Products
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => updateFilter(setQuery)(e.target.value)}
          className="w-full md:w-80 mt-4 bg-[#FDFDFD] rounded-full px-4 py-2.5
            text-xs md:text-sm text-[#111111] placeholder:text-[#CCCCCC]
            shadow-[3px_4px_6.7px_rgba(0,0,0,0.03)] outline-none"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <ProductFilters
          categories={categories}
          selectedCategory={category}
          onCategoryChange={updateFilter(setCategory)}
          priceBounds={priceBounds}
          priceRange={priceRange}
          onPriceRangeChange={updateFilter(setPriceRange)}
          availability={availability}
          onAvailabilityChange={updateFilter(setAvailability)}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-1">
          <p className="text-xs md:text-sm text-[#CCCCCC] mb-4">
            {filteredProducts.length} products
          </p>

          <ProductsGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}