"use client";

import { useState } from "react";
import Link from "next/link";
import data from "@/src/database/db.json";

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

const items: FoodItem[] = (data.products as Product[])
  .filter((product) => product.available)
  .map((product) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    price: `$${product.price}`,
    discount: "Amazing Offers",
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
    if (items.length <= 1) return;

    setFading(true);

    setTimeout(() => {
      setIndex(
        (prev) => (prev + dir + items.length) % items.length
      );
      setFading(false);
    }, 180);
  };

  return (
    <>
      {/* ===================== MOBILE ===================== */}

      <div className="mx-auto mt-4 w-[92%] rounded-[32px] bg-[#F7F9FC] px-6 pb-6 pt-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:hidden">
        <div
          className={`transition-opacity duration-200 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* IMAGE */}

          <Link
            href={`/product/${item.id}`}
            className="block"
            aria-label={`View ${item.name}`}
          >
            <div className="relative mx-auto h-60 w-60">
              <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-[#EEF1F5]" />

              <div className="absolute inset-0 m-auto h-56 w-56 overflow-hidden rounded-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              {item.discount && (
                <div className="absolute -right-10 -top-4 rounded-full  bg-[#dc143c]  px-2.5 pb-1 shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-white">
                    {item.discount}
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* TITLE + DESCRIPTION */}

          <Link
            href={`/product/${item.id}`}
            className="mt-6 block text-center"
          >
            <h2 className="text-[26px] font-black tracking-tight text-[#111111]">
              {item.name}
            </h2>

            <p className="mx-auto mt-2 max-w-[88%] text-sm font-bold leading-relaxed text-[#999999]">
              {item.description}
            </p>
          </Link>

          {/* PRICE + BUY */}

          <div className="relative mt-6 flex h-12 items-center rounded-full bg-[#F0F1F6]">
            <span className="pl-5 text-base font-semibold text-[#111111]">
              {item.price}
            </span>

            <Link
              href={`/product/${item.id}`}
              className="absolute right-0 top-0 flex h-full items-center rounded-full bg-[#111111] px-7 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Buy now
            </Link>
          </div>
        </div>

        {/* CAROUSEL CONTROLS */}

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous item"
            disabled={items.length <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-3" />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((food, i) => (
              <button
                key={food.id}
                type="button"
                aria-label={`Go to ${food.name}`}
                onClick={() => {
                  if (i === index) return;

                  setFading(true);

                  setTimeout(() => {
                    setIndex(i);
                    setFading(false);
                  }, 180);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-[#111111]"
                    : "w-1.5 bg-black/15"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next item"
            disabled={items.length <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-3" />
          </button>
        </div>
      </div>

      {/* ===================== TABLET / DESKTOP ===================== */}

      <div className="mx-auto mt-7 hidden w-[95%] [container-type:inline-size] md:block">
        <div className="relative h-[66.575cqw] w-full">
          {/* BACKGROUND CARD */}

          <div className="absolute left-0 top-[3.302%] h-[72.489%] w-full rounded-[2.747cqw] bg-[#F7F9FC] shadow-[0_10px_30px_rgba(0,0,0,0.04)]" />

          {/* CIRCLE BACKGROUND */}

          <div className="absolute left-[40.751%] top-[16.230%] h-[70.564%] w-[47.619%] rounded-full bg-[#EEF1F5]" />

          {/* CONTENT */}

          <div
            className={`absolute inset-0 transition-opacity duration-200 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* PRODUCT IMAGE */}

            <Link
              href={`/product/${item.id}`}
              className="absolute left-[30.495%] top-0 block h-full w-[66.575%] overflow-hidden rounded-full"
              aria-label={`View ${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </Link>

            {/* TITLE */}

            <Link
              href={`/product/${item.id}`}
              className="absolute left-[5.128%] top-[11.279%]"
            >
              <h2 className="text-[4.5cqw] font-black leading-none tracking-[0.02em] text-[#111111]">
                {item.name}
              </h2>
            </Link>

            {/* DESCRIPTION */}

            <Link
              href={`/product/${item.id}`}
              className="absolute left-[5.220%] top-[23.636%] w-[35.256%]"
            >
              <p className="text-[1.465cqw] font-bold leading-snug text-[#999999]">
                {item.description}
              </p>
            </Link>

            {/* PRICE + BUY */}

            <div className="absolute left-[5.128%] top-[58.872%] flex h-[7.290%] w-[20.055%] items-center rounded-full bg-[#F0F1F6]">
              <span className="pl-[2.198cqw] text-[1.465cqw] font-semibold text-[#111111]">
                {item.price}
              </span>

              <Link
                href={`/product/${item.id}`}
                aria-label={`Buy ${item.name}`}
                className="absolute right-0 top-0 flex h-full w-[55.251%] items-center justify-center rounded-full bg-[#111111] text-[1.465cqw] font-semibold text-white transition hover:bg-gray-800"
              >
                buy
              </Link>
            </div>

            {/* DISCOUNT */}

            {item.discount && (
              <Link
                href={`/product/${item.id}`}
                className="absolute right-[2%] top-[5.5%] rounded-full bg-[#dc143c] px-[1.6cqw] py-[0.8cqw] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
              >
                <span className="whitespace-nowrap text-[1.35cqw] font-medium uppercase tracking-wide text-white">
                  {item.discount}
                </span>
              </Link>
            )}
          </div>

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous item"
            disabled={items.length <= 1}
            className="absolute left-[86.264%] top-[64.512%] flex h-[7.427%] w-[4.945%] items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-[1.8cqw] w-[1cqw]" />
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next item"
            disabled={items.length <= 1}
            className="absolute left-[92.674%] top-[64.512%] flex h-[7.427%] w-[4.945%] items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-[1.8cqw] w-[1cqw]" />
          </button>
        </div>
      </div>
    </>
  );
}