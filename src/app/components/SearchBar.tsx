"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SearchIcon } from "lucide-react";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { allProducts } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { useDebounce } from "@/src/app/hooks/use-debounce";

export default function Searchbar() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 200);

  const previewResults =
    debouncedQuery.trim().length > 0
      ? searchProducts(debouncedQuery, allProducts).slice(0, 5)
      : [];

  useEffect(() => {
    setIsOpen(previewResults.length > 0 && query.trim().length > 0);
  }, [previewResults.length, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToSearchPage() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <Field className="mx-auto w-[91%] sm:w-[88%] md:w-[92%] mt-4 md:mt-7 relative">
      <div ref={containerRef}>
        <InputGroup
          className="bg-mainT rounded-full
              border-hidden h-10 md:h-13 mx-auto
              shadow-[3px_4px_6.7px_rgba(0,0,0,0.03)]
              border-transparent focus-within:border-transparent
              focus-within:ring-0"
        >
          <InputGroupInput
            className="placeholder:text-[#CCCCCC]
              placeholder:font-light text-xs md:placeholder:text-sm"
            id="search"
            autoComplete="off"
            placeholder="Search for food, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToSearchPage();
            }}
            onFocus={() => {
              if (previewResults.length > 0) setIsOpen(true);
            }}
          />

          <InputGroupAddon align="inline-start">
            <SearchIcon
              onClick={goToSearchPage}
              className="size-5 md:size-7 text-muted-foreground ml-2.5 mr-2.5 cursor-pointer"
            />
          </InputGroupAddon>
        </InputGroup>

        {isOpen && (
          <div
            className="absolute left-0 right-0 top-[110%] z-50
              bg-[#FDFDFD] rounded-2xl shadow-lg border border-[#EFF2F5]
              overflow-hidden"
          >
            {previewResults.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/search?q=${encodeURIComponent(product.title)}`);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5
                  hover:bg-[#F0F2F6] transition-colors text-left"
              >
                <div className="relative size-9 rounded-lg overflow-hidden shrink-0 bg-[#EFF2F5]">
                  <Image
                    src={`/${product.image}`}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-[#111111] truncate">
                    {product.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-[#CCCCCC]">
                    ${product.price}
                  </p>
                </div>
              </button>
            ))}

            <button
              onClick={goToSearchPage}
              className="w-full text-center py-2.5 text-xs md:text-sm
                text-[#111111] font-medium border-t border-[#EFF2F5]
                hover:bg-[#F0F2F6] transition-colors"
            >
              View all results for "{query}"
            </button>
          </div>
        )}
      </div>
    </Field>
  );
}