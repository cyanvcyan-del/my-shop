"use client";

import { use, useState } from "react";
import {
  Heart,
  Share2,
  Clock3,
  Flame,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";

import data from "@/src/database/db.json";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetails({ params }: ProductPageProps) {
  const { id } = use(params);

  const product = data.products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f6f8]">
        <div className="text-center">
          <h1 className="text-2xl font-black text-black">
            Product not found
          </h1>

          <p className="mt-2 text-gray-500">
            This product does not exist.
          </p>
        </div>
      </main>
    );
  }

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title}`,
          url: window.location.href,
        });
      } catch {
        // کاربر Share را لغو کرده
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-mainP-500px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto  max-w-[1240px]">

        {/* ================= PRODUCT ================= */}
        <section className="grid overflow-hidden rounded-[24px] bg-mainT shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] lg:grid-cols-2">

          {/* ================= IMAGE ================= */}
          <div className="flex min-h-[500px] items-center justify-center bg-mainT shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] p-8 sm:min-h-[560px] lg:p-12">
            <img
              src={`/${product.image}`}
              alt={product.title}
              className="h-auto max-h-[500px] w-full max-w-[560px] object-contain"
            />
          </div>

          {/* ================= INFO ================= */}
          <div className="relative flex flex-col px-7 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">

            {/* Favorite + Share */}
            <div className="absolute right-7 top-7 flex gap-3 sm:right-10 sm:top-10 lg:right-12 lg:top-12">

            

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share"
                className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-gray-200 bg-white text-black transition hover:bg-gray-50 sm:h-12 sm:w-12"
              >
                <Share2
                  size={20}
                  strokeWidth={1.8}
                />
              </button>

            </div>
{/* ================= AVAILABILITY ================= */}
<div className="mb-4 flex items-center gap-2">
  <span
    className={`h-2.5 w-2.5 rounded-full ${
      product.available ? "bg-green-500" : "bg-red-500"
    }`}
  />

  <span
    className={`text-sm font-medium ${
      product.available ? "text-green-600" : "text-red-600"
    }`}
  >
    {product.available ? "Available" : "Not Available"}
  </span>
</div>
            {/* ================= TITLE ================= */}
            <div className="pr-24 sm:pr-28">
              <h1 className="text-3xl font-black leading-[1.18] tracking-[-0.7px] text-black sm:text-[30px]">
                {product.title}
              </h1>
            </div>

            {/* ================= RATING ================= */}
            <div className="mt-5 flex items-center gap-3">

              <div className="flex items-center gap-[2px]">
                <span className="text-[20px] text-black">★</span>
                <span className="text-[20px] text-black">★</span>
                <span className="text-[20px] text-black">★</span>
                <span className="text-[20px] text-black">★</span>
                <span className="text-[20px] text-gray-300">★</span>
              </div>

              <span className="text-[14px] font-semibold text-gray-700">
                4.6
              </span>

              <span className="text-[14px] text-gray-500">
                (128 reviews)
              </span>

            </div>

            {/* ================= PRICE ================= */}
            <p className="mt-4 text-[30px] font-bold tracking-[-0.5px] text-black">
              ${product.price}
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* ================= DESCRIPTION ================= */}
            <p className="max-w-[540px] text-[15px] font-medium leading-[1.7] text-gray-500">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* ================= PRODUCT DETAILS ================= */}
            <div className="grid grid-cols-2">

              {/* ================= TIME ================= */}
              <div className="flex items-center gap-3 border-r border-gray-200 pr-4 sm:gap-4 sm:pr-6">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mainP-500 sm:h-11 sm:w-11">
                  <Clock3
                    size={21}
                    strokeWidth={1.7}
                    className="text-black"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-xs md:text-sm">
                    Ready in
                  </p>

                  <p className="mt-1 text-[13px] font-semibold text-black sm:text-[14px]">
                    {product.time}
                  </p>
                </div>

              </div>

              {/* ================= SPICE ================= */}
              <div className="flex items-center gap-3 pl-4 sm:gap-4 sm:pl-6">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full  bg-mainP-500  sm:h-11 sm:w-11">
                  <Flame
                    size={21}
                    strokeWidth={1.7}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-xs md:text-sm">
                    Spice level
                  </p>

                  <p className="mt-1 text-[13px] font-semibold text-orange-500 sm:text-[14px]">
                    {product.spice}
                  </p>
                </div>

              </div>

            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* ================= ACTIONS ================= */}
            <div className="mt-auto flex items-center gap-2.5 sm:gap-3">

              {/* Quantity */}
              <div className="flex h-[56px] shrink-0 overflow-hidden rounded-[14px] border border-gray-200 bg-white">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                  className="flex w-11 items-center justify-center text-black transition hover:bg-gray-50 sm:w-[50px]"
                >
                  <Minus
                    size={17}
                    strokeWidth={1.8}
                  />
                </button>

                <div className="flex w-11 items-center justify-center border-x border-gray-200 text-[15px] font-semibold sm:w-[52px]">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  className="flex w-11 items-center justify-center text-black transition hover:bg-gray-50 sm:w-[50px]"
                >
                  <Plus
                    size={17}
                    strokeWidth={1.8}
                  />
                </button>

              </div>

              {/* Favorite */}
              <button
                type="button"
                onClick={() => setFavorite((current) => !current)}
                aria-label="Favorite"
                className={`flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[14px] border transition ${
                  favorite
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-black hover:bg-gray-50"
                }`}
              >
                <Heart
                  size={21}
                  strokeWidth={1.8}
                  fill={favorite ? "currentColor" : "none"}
                />
              </button>

              {/* Add to cart */}
              <button
  type="button"
  disabled={!product.available}
  className={`flex h-[56px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[14px] px-4 text-[14px] font-semibold text-white transition sm:gap-3 sm:text-[15px] ${
    product.available
      ? "bg-black hover:bg-gray-800"
      : "cursor-not-allowed bg-gray-300 text-gray-500"
  }`}
>
  <ShoppingCart
    size={20}
    strokeWidth={1.8}
  />

  <span className="truncate">
    {product.available ? "Add to cart" : "Unavailable"}
  </span>
</button>

            </div>

          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}
        <section className="mt-6 rounded-[24px] bg-white px-5 py-6 sm:px-7 sm:py-7 lg:px-8">

          <div className="mb-5">
            <h2 className="text-[17px] font-bold text-black">
              You may also like
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

            {data.products
              .filter(
                (item) => String(item.id) !== String(product.id)
              )
              .slice(0, 4)
              .map((item) => (
                <a
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group rounded-[18px] bg-[#fafafa] p-3.5 transition hover:bg-[#f7f7f7] sm:p-4"
                >

                  {/* Image */}
                  <div className="flex h-[130px] items-center justify-center overflow-hidden rounded-[14px] sm:h-[145px]">
                    <img
                      src={`/${item.image}`}
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex items-end justify-between gap-2">

                    <div className="min-w-0">

                      <h3 className="line-clamp-2 text-[13px] font-semibold leading-[1.4] text-black sm:text-[14px]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[14px] font-bold text-black sm:text-[15px]">
                        ${item.price}
                      </p>

                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white sm:h-9 sm:w-9">
                      <Heart
                        size={16}
                        strokeWidth={1.7}
                      />
                    </span>

                  </div>

                </a>
              ))}

          </div>
        </section>

      </div>
    </main>
  );
}