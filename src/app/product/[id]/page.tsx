
"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  Clock3,
  Flame,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import data from "@/src/database/db.json";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type CartItem = {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
  quantity: number;
};

export default function ProductDetails({
  params,
}: ProductPageProps) {
  const { id } = use(params);

  const product = data.products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mainP-500 px-5">
        <div className="text-center">
          <h1 className="text-2xl font-black text-black sm:text-3xl">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            This product does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          window.location.href
        );

        toast.add({
          title: "Link copied",
          description:
            "Product link has been copied to your clipboard.",
          type: "success",
        });
      } catch {
        toast.add({
          title: "Could not copy link",
          description:
            "Something went wrong while copying the product link.",
          type: "error",
        });
      }
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {
    // =========================
    // CHECK LOGIN
    // =========================

    const localUser = localStorage.getItem(
      "verdea-current-user"
    );

    const sessionUser = sessionStorage.getItem(
      "verdea-current-user"
    );

    const currentUser = localUser || sessionUser;

    if (!currentUser) {
      toast.add({
        title: "Login required",
        description:
          "Please sign in before adding products to your cart.",
        type: "error",
      });

      window.location.href = "/sign-in";
      return;
    }

    // =========================
    // CHECK PRODUCT AVAILABILITY
    // =========================

    if (!product.available) {
      toast.add({
        title: "Product unavailable",
        description: `${product.title} is currently unavailable.`,
        type: "error",
      });

      return;
    }

    // =========================
    // GET CURRENT CART
    // =========================

    let existingCart: CartItem[] = [];

    try {
      existingCart = JSON.parse(
        localStorage.getItem("verdea-cart") || "[]"
      );
    } catch {
      existingCart = [];
    }

    // =========================
    // CHECK EXISTING PRODUCT
    // =========================

    const existingProduct = existingCart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    let updatedCart: CartItem[];

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          quantity: quantity,
        },
      ];
    }

    // =========================
    // SAVE CART
    // =========================

    localStorage.setItem(
      "verdea-cart",
      JSON.stringify(updatedCart)
    );

    // =========================
    // NOTIFY NAVBAR
    // =========================

    window.dispatchEvent(
      new Event("verdea-cart-change")
    );

    // =========================
    // BUTTON FEEDBACK
    // =========================

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1800);

    // =========================
    // SUCCESS TOAST
    // =========================

    toast.add({
      title: "Added to cart",
      description: `${product.title} × ${quantity} has been added to your cart.`,
      type: "success",
    });
  };

  return (
    <main className="min-h-screen bg-mainP-500 px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1240px]">

        {/* ================= PRODUCT ================= */}

        <section className="grid overflow-hidden rounded-[20px] bg-mainT shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:rounded-[24px] lg:grid-cols-2">

          {/* ================= IMAGE ================= */}

          <div className="flex min-h-[300px] items-center justify-center bg-mainT p-5 sm:min-h-[400px] sm:p-8 md:min-h-[470px] md:p-10 lg:min-h-[600px] lg:p-12">
            <img
              src={`/${product.image}`}
              alt={product.title}
              className="h-auto max-h-[300px] w-full max-w-[330px] object-contain sm:max-h-[380px] sm:max-w-[420px] md:max-h-[450px] md:max-w-[500px] lg:max-h-[500px] lg:max-w-[560px]"
            />
          </div>

          {/* ================= INFO ================= */}

          <div className="relative flex flex-col px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12 lg:py-12">

            {/* ================= SHARE ================= */}

            <div className="absolute right-5 top-5 sm:right-8 sm:top-8 md:right-10 md:top-10 lg:right-12 lg:top-12">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share"
                className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-gray-200 bg-white text-black transition hover:bg-gray-50 sm:h-11 sm:w-11 md:h-12 md:w-12"
              >
                <Share2
                  size={18}
                  strokeWidth={1.8}
                  className="sm:h-5 sm:w-5"
                />
              </button>
            </div>

            {/* ================= AVAILABILITY ================= */}

            <div className="mb-3 flex items-center gap-2 pr-14 sm:mb-4 sm:pr-16">
              <span
                className={`h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${
                  product.available
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span
                className={`text-xs font-medium sm:text-sm ${
                  product.available
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.available
                  ? "Available"
                  : "Not Available"}
              </span>
            </div>

            {/* ================= TITLE ================= */}

            <div className="max-w-full pr-12 sm:pr-16 md:pr-20 lg:pr-24">
              <h1 className="text-2xl font-black leading-[1.2] tracking-[-0.5px] text-black sm:text-3xl md:text-[30px] lg:text-[32px]">
                {product.title}
              </h1>
            </div>

            {/* ================= RATING ================= */}

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-5 sm:gap-3">
              <div className="flex items-center gap-[1px] sm:gap-[2px]">
                <span className="text-[17px] text-black sm:text-[20px]">
                  ★
                </span>

                <span className="text-[17px] text-black sm:text-[20px]">
                  ★
                </span>

                <span className="text-[17px] text-black sm:text-[20px]">
                  ★
                </span>

                <span className="text-[17px] text-black sm:text-[20px]">
                  ★
                </span>

                <span className="text-[17px] text-gray-300 sm:text-[20px]">
                  ★
                </span>
              </div>

              <span className="text-xs font-semibold text-gray-700 sm:text-sm">
                4.6
              </span>

              <span className="text-xs text-gray-500 sm:text-sm">
                (128 reviews)
              </span>
            </div>

            {/* ================= PRICE ================= */}

            <p className="mt-3 text-2xl font-bold tracking-[-0.5px] text-black sm:mt-4 sm:text-[30px]">
              ${product.price}
            </p>

            {/* ================= DIVIDER ================= */}

            <div className="my-5 h-px bg-gray-200 sm:my-6" />

            {/* ================= DESCRIPTION ================= */}

            <p className="max-w-[540px] text-sm font-medium leading-[1.7] text-gray-500 sm:text-[15px]">
              {product.description}
            </p>

            {/* ================= DIVIDER ================= */}

            <div className="my-5 h-px bg-gray-200 sm:my-6" />

            {/* ================= PRODUCT DETAILS ================= */}

            <div className="grid grid-cols-2">

              {/* TIME */}

              <div className="flex items-center gap-2 border-r border-gray-200 pr-3 sm:gap-4 sm:pr-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mainP-500 sm:h-11 sm:w-11">
                  <Clock3
                    size={18}
                    strokeWidth={1.7}
                    className="text-black sm:h-[21px] sm:w-[21px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-gray-500 sm:text-xs md:text-sm">
                    Ready in
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-black sm:text-[14px]">
                    {product.time}
                  </p>
                </div>
              </div>

              {/* SPICE */}

              <div className="flex items-center gap-2 pl-3 sm:gap-4 sm:pl-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mainP-500 sm:h-11 sm:w-11">
                  <Flame
                    size={18}
                    strokeWidth={1.7}
                    className="text-orange-500 sm:h-[21px] sm:w-[21px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-gray-500 sm:text-xs md:text-sm">
                    Spice level
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-orange-500 sm:text-[14px]">
                    {product.spice}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= DIVIDER ================= */}

            <div className="my-5 h-px bg-gray-200 sm:my-6" />

            {/* ================= ACTIONS ================= */}

            <div className="mt-auto flex w-full items-stretch gap-2 sm:gap-3">

              {/* QUANTITY */}

              <div className="flex h-[52px] shrink-0 overflow-hidden rounded-[13px] border border-gray-200 bg-white sm:h-[56px] sm:rounded-[14px]">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                  className="flex w-9 items-center justify-center text-black transition hover:bg-gray-50 sm:w-[50px]"
                >
                  <Minus
                    size={15}
                    strokeWidth={1.8}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </button>

                <div className="flex w-9 items-center justify-center border-x border-gray-200 text-sm font-semibold sm:w-[52px] sm:text-[15px]">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  className="flex w-9 items-center justify-center text-black transition hover:bg-gray-50 sm:w-[50px]"
                >
                  <Plus
                    size={15}
                    strokeWidth={1.8}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </button>
              </div>

              {/* FAVORITE */}

              <button
                type="button"
                onClick={() =>
                  setFavorite((current) => !current)
                }
                aria-label="Favorite"
                className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[13px] border transition sm:h-[56px] sm:w-[56px] sm:rounded-[14px] ${
                  favorite
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-black hover:bg-gray-50"
                }`}
              >
                <Heart
                  size={19}
                  strokeWidth={1.8}
                  className="sm:h-[21px] sm:w-[21px]"
                  fill={
                    favorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              {/* ADD TO CART */}

              <button
                type="button"
                disabled={!product.available}
                onClick={handleAddToCart}
                className={`flex h-[52px] min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-[13px] px-2.5 text-xs font-semibold transition sm:h-[56px] sm:gap-3 sm:rounded-[14px] sm:px-4 sm:text-[15px] ${
                  product.available
                    ? isAdded
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                {isAdded ? (
                  <>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white text-[9px] sm:h-5 sm:w-5 sm:text-[11px]">
                      ✓
                    </span>

                    <span className="truncate">
                      Added to cart
                    </span>
                  </>
                ) : (
                  <>
                    <ShoppingCart
                      size={17}
                      strokeWidth={1.8}
                      className="shrink-0 sm:h-5 sm:w-5"
                    />

                    <span className="truncate">
                      {product.available
                        ? "Add to cart"
                        : "Unavailable"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}

        <section className="mt-5 rounded-[20px] bg-white px-4 py-5 sm:mt-6 sm:rounded-[24px] sm:px-7 sm:py-7 lg:px-8">

          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-bold text-black sm:text-[17px]">
              You may also like
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">

            {data.products
              .filter(
                (item) =>
                  String(item.id) !==
                  String(product.id)
              )
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group min-w-0 rounded-[16px] bg-[#fafafa] p-2.5 transition hover:bg-[#f7f7f7] sm:rounded-[18px] sm:p-4"
                >

                  {/* IMAGE */}

                  <div className="flex h-[110px] items-center justify-center overflow-hidden rounded-[12px] sm:h-[145px] sm:rounded-[14px]">
                    <img
                      src={`/${item.image}`}
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* INFO */}

                  <div className="mt-3 flex items-end justify-between gap-1.5 sm:mt-4 sm:gap-2">

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-xs font-semibold leading-[1.4] text-black sm:text-[14px]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs font-bold text-black sm:mt-3 sm:text-[15px]">
                        ${item.price}
                      </p>
                    </div>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white sm:h-9 sm:w-9">
                      <Heart
                        size={14}
                        strokeWidth={1.7}
                        className="sm:h-4 sm:w-4"
                      />
                    </span>
                  </div>
                </Link>
              ))}

          </div>
        </section>
      </div>
    </main>
  );
}

