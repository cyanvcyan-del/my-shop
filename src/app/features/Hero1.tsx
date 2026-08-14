'use client';

import { useState } from 'react';
import data from '@/src/database/db.json';

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  spice: string;
  time: string;
  available: boolean;
}

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: string;
  discount?: string;
  image: string;
}

// Only items currently in stock are shown in the hero slideshow.
// `discount` isn't part of the product data yet, so every item gets the
// same "Amazing Offers" tag for now — swap this for a real per-product
// field whenever one exists.
const items: FoodItem[] = (data.products as Product[])
  .filter((product) => product.available)
  .map((product) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    price: `$${product.price}`,
    discount: 'Amazing Offers',
    image: `/${product.image}`,
  }));

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 18" className={className} fill="none">
      <path
        d="M9 1L1 9L9 17"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 18" className={className} fill="none">
      <path
        d="M1 1L9 9L1 17"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const item = items[index];

  const go = (dir: 1 | -1) => {
    setFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + dir + items.length) % items.length);
      setFading(false);
    }, 180);
  };

  return (
    <>
      {/* ===================== MOBILE (below md) ===================== */}
      {/* Same surfaces as the desktop card (flat neutrals, soft shadow,
          plain circular photo) rearranged into a simple stack — no
          extra colors or decoration added. */}
      <div className="md:hidden w-[92%] mx-auto mt-4 rounded-[32px] bg-[#F7F9FC] shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-6 pt-8 pb-6">
        <div
          className={`transition-opacity duration-200 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* image */}
          <div className="relative h-60 w-60 mx-auto">
            <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-[#EEF1F5]" />
            <div className="absolute inset-0 m-auto h-56 w-56 rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            {item.discount && (
              <div className="absolute -top-4 -right-10 rounded-full bg-[#111111] px-2.5 pb-1 shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
                <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-white">
                  {item.discount}
                </span>
              </div>
            )}
          </div>

          {/* title + description */}
          <div className="mt-6 text-center">
            <h2 className="text-[26px] font-black text-[#111111] tracking-tight">
              {item.name}
            </h2>
            <p className="mx-auto mt-2 max-w-[88%] text-sm font-bold leading-relaxed text-[#999999]">
              {item.description}
            </p>
          </div>

          {/* price + buy */}
          <div className="mt-6 relative h-12 rounded-full bg-[#F0F1F6] flex items-center">
            <span className="pl-5 text-base font-semibold text-[#111111]">
              {item.price}
            </span>
            <button
              type="button"
              className="absolute right-0 top-0 h-full rounded-full bg-[#111111] px-7 text-sm font-semibold text-white"
            >
              Buy now
            </button>
          </div>
        </div>

        {/* carousel controls */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous item"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)]"
          >
            <ChevronLeft className="h-4 w-3" />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((food, i) => (
              <span
                key={food.id}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-[#111111]' : 'w-1.5 bg-black/15'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next item"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)]"
          >
            <ChevronRight className="h-4 w-3" />
          </button>
        </div>
      </div>

      {/* ================= TABLET / DESKTOP (md and up) ================= */}
      {/* Everything here scales as one unit (cqw units, tied to the
          component's own width) so it stays pixel-faithful to the Figma
          design at any width from tablet up. */}
      <div className="hidden md:block w-[95%] mx-auto mt-7 [container-type:inline-size]">
        <div className="relative w-full h-[66.575cqw]">
          <div className="absolute left-0 top-[3.302%] w-full h-[72.489%] rounded-[2.747cqw] bg-[#F7F9FC] shadow-[0_10px_30px_rgba(0,0,0,0.04)]" />

          <div className="absolute left-[40.751%] top-[16.230%] w-[47.619%] h-[70.564%] rounded-full bg-[#EEF1F5]" />

          <div
            className={`absolute inset-0 transition-opacity duration-200 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="absolute left-[30.495%] top-0 w-[66.575%] h-full rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="absolute left-[5.128%] top-[11.279%] text-[4.5cqw] font-black text-[#111111] leading-none tracking-[0.02em]">
              {item.name}
            </h2>

            <p className="absolute left-[5.220%] top-[23.636%] w-[35.256%] text-[1.465cqw] font-bold text-[#999999] leading-snug">
              {item.description}
            </p>

            <div className="absolute left-[5.128%] top-[58.872%] w-[20.055%] h-[7.290%] rounded-full bg-[#F0F1F6] flex items-center">
              <span className="pl-[2.198cqw] text-[1.465cqw] font-semibold text-[#111111]">
                {item.price}
              </span>
              <button
                type="button"
                aria-label="Buy"
                className="absolute right-0 top-0 h-full w-[55.251%] rounded-full bg-[#111111] text-white text-[1.465cqw] font-semibold flex items-center justify-center"
              >
                buy
              </button>
            </div>

            {item.discount && (
              <div className="absolute top-[5.5%] right-[2%] rounded-full bg-[#111111] px-[1.6cqw] py-[0.8cqw] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                <span className="whitespace-nowrap text-[1.35cqw] font-medium uppercase tracking-wide text-white">
                  {item.discount}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous item"
            className="absolute left-[86.264%] top-[64.512%] w-[4.945%] h-[7.427%] rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] flex items-center justify-center"
          >
            <ChevronLeft className="w-[1cqw] h-[1.8cqw]" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next item"
            className="absolute left-[92.674%] top-[64.512%] w-[4.945%] h-[7.427%] rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] flex items-center justify-center"
          >
            <ChevronRight className="w-[1cqw] h-[1.8cqw]" />
          </button>
        </div>
      </div>
    </>
  );
}
