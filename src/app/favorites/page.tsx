"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

import {
  getFavorites,
  removeFavorite,
  FAVORITES_EVENT,
  type FavoriteItem,
} from "@/lib/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);

    const syncFavorites = () => setFavorites(getFavorites());

    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

  function handleRemove(id: string | number) {
    removeFavorite(id);
    setFavorites(getFavorites());
  }

  function handleClearAll() {
    favorites.forEach((item) => removeFavorite(item.id));
    setFavorites([]);
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F0F2F6] px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#111111] tracking-[-0.5px]">
              My Favorites
            </h1>
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              {favorites.length === 0
                ? "Nothing here yet"
                : `${favorites.length} item${favorites.length > 1 ? "s" : ""} saved`}
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs md:text-sm font-medium text-gray-400 hover:text-[#111111] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 md:py-32 bg-[#FDFDFD] rounded-[24px] shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]">
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#F7F7FC]">
              <Heart
                size={28}
                strokeWidth={1.6}
                className="text-gray-300"
              />
            </div>

            <h2 className="mt-6 text-base md:text-lg font-bold text-[#111111]">
              Your favorites list is empty
            </h2>
            <p className="mt-2 text-xs md:text-sm text-gray-500 max-w-xs">
              Tap the heart icon on any product to save it here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-xs md:text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Browse products
            </Link>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#FDFDFD] rounded-[20px] overflow-hidden shadow-[3px_4px_6.7px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[3px_10px_20px_rgba(0,0,0,0.06)]"
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  aria-label="Remove from favorites"
                  className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur text-gray-400 shadow-sm transition-colors hover:bg-[#111111] hover:text-white"
                >
                  <Trash2 size={14} strokeWidth={1.8} />
                </button>

                <Link href={`/product/${item.id}`} className="block">
                  {/* Image */}
                  <div className="flex items-center justify-center bg-[#F7F7FC] aspect-square p-5">
                    <img
                      src={`/${item.image}`}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3 md:p-4">
                    <h3 className="line-clamp-2 text-xs md:text-sm font-semibold text-[#111111] leading-snug">
                      {item.title}
                    </h3>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-sm md:text-base font-bold text-[#111111]">
                        ${item.price}
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white transition-transform group-hover:scale-105">
                        <ShoppingBag size={14} strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}