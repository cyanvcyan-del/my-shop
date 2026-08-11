"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import data from "@/src/database/db.json";
import { Minus, Plus, Trash2, Tag, Check, ArrowRight } from "lucide-react";

type CartItem = {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
  quantity: number;
};

type DiscountCode = {
  code: string;
  percentage: number;
};

const discountCodes: DiscountCode[] = [
  {
    code: "QAZWSX",
    percentage: 20,
  },
  {
    code: "VERDEA10",
    percentage: 10,
  },
  {
    code: "VERDEA40",
    percentage: 40,
  },
];

export default function Cart() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [discountCode, setDiscountCode] = useState("");

  const [appliedDiscount, setAppliedDiscount] =
    useState<DiscountCode | null>(null);

  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("verdea-current-user");

    const sessionUser = sessionStorage.getItem("verdea-current-user");

    const currentUser = localUser || sessionUser;

    if (!currentUser) {
      router.replace("/sign-in");
      return;
    }

    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("verdea-cart") || "[]"
    );

    const availableCartItems = storedCart.filter((cartItem) => {
      const currentProduct = data.products.find(
        (product) =>
          String(product.id) === String(cartItem.id)
      );

      return currentProduct?.available === true;
    });

    localStorage.setItem(
      "verdea-cart",
      JSON.stringify(availableCartItems)
    );

    setCartItems(availableCartItems);
  }, [router]);

  const updateQuantity = (
    id: string | number,
    amount: number
  ) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + amount
              ),
            }
          : item
      );

      localStorage.setItem(
        "verdea-cart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const removeItem = (
    id: string | number
  ) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) =>
          String(item.id) !== String(id)
      );

      localStorage.setItem(
        "verdea-cart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const applyDiscount = () => {
    const enteredCode = discountCode
      .trim()
      .toUpperCase();

    setDiscountError("");

    if (!enteredCode) {
      setDiscountError(
        "Please enter a discount code."
      );
      return;
    }

    const foundCode = discountCodes.find(
      (discount) =>
        discount.code === enteredCode
    );

    if (!foundCode) {
      setAppliedDiscount(null);

      setDiscountError(
        "Invalid discount code."
      );

      return;
    }

    setAppliedDiscount(foundCode);

    setDiscountCode(foundCode.code);

    setDiscountError("");

    localStorage.setItem(
      "verdea-discount",
      JSON.stringify(foundCode)
    );
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountError("");

    localStorage.removeItem(
      "verdea-discount"
    );
  };

  const discountAmount = appliedDiscount
    ? totalPrice *
      (appliedDiscount.percentage / 100)
    : 0;

  const finalPrice =
    totalPrice - discountAmount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-mainP-500 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-[95%] max-w-[1240px]">

        {/* TITLE */}

        <h1 className="mt-10 text-lg font-black md:text-2xl xl:text-[2.5rem]">
          Cart
        </h1>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (
          <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-[24px] bg-mainT">

            <p className="text-sm font-medium text-gray-500 md:text-base">
              Your cart is empty.
            </p>

            <Link
              href="/"
              className="mt-5 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>

          </div>
        ) : (

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_350px]">

            {/* PRODUCTS */}

            <div className="flex flex-col gap-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[24px] bg-mainT p-4 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:flex-row sm:items-center sm:p-5"
                >

                  {/* PRODUCT */}

                  <Link
                    href={`/product/${item.id}`}
                    className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center"
                  >

                    {/* IMAGE */}

                    <div className="flex h-[180px] w-full shrink-0 items-center justify-center rounded-[18px] bg-white sm:h-[150px] sm:w-[150px]">

                      <img
                        src={`/${item.image}`}
                        alt={item.title}
                        className="h-full w-full object-contain p-3"
                      />

                    </div>

                    {/* INFORMATION */}

                    <div className="flex min-w-0 flex-1 flex-col justify-center">

                      <h2 className="line-clamp-2 text-base font-bold text-black transition hover:text-gray-600 md:text-lg">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-sm font-bold text-black md:text-base">
                        $
                        {Number(item.price).toFixed(2)}
                      </p>

                    </div>

                  </Link>

                  {/* ACTIONS */}

                  <div className="flex items-center justify-between gap-3 sm:shrink-0">

                    {/* QUANTITY */}

                    <div className="flex h-10 overflow-hidden rounded-full border border-gray-200 bg-white">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            -1
                          )
                        }
                        className="flex w-10 items-center justify-center transition hover:bg-gray-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      <div className="flex w-10 items-center justify-center border-x border-gray-200 text-sm font-semibold">
                        {item.quantity}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            1
                          )
                        }
                        className="flex w-10 items-center justify-center transition hover:bg-gray-50"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-red-500 transition hover:bg-red-50"
                      aria-label="Remove product"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* ORDER SUMMARY */}

            <div className="h-fit rounded-[24px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-6">

              <h2 className="text-lg font-black md:text-xl">
                Order Summary
              </h2>

              <div className="my-5 h-px bg-gray-200" />

              {/* ITEMS */}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Items</span>

                <span>
                  {totalItems}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-sm font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* DISCOUNT CODE */}

              <div className="mt-6">

                <p className="mb-2 text-sm font-semibold text-black">
                  Discount code
                </p>

                <div className="flex gap-2">

                  <div className="relative min-w-0 flex-1">

                    <Tag
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={discountCode}
                      onChange={(event) => {
                        setDiscountCode(
                          event.target.value
                        );

                        if (discountError) {
                          setDiscountError("");
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          applyDiscount();
                        }
                      }}
                      placeholder="Enter code"
                      disabled={!!appliedDiscount}
                      className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black disabled:bg-gray-100"
                    />

                  </div>

                  {appliedDiscount ? (
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="h-11 shrink-0 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-black transition hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={applyDiscount}
                      className="h-11 shrink-0 rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  )}

                </div>

                {/* ERROR */}

                {discountError && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {discountError}
                  </p>
                )}

                {/* SUCCESS */}

                {appliedDiscount && (
                  <div className="mt-3 flex items-center gap-2 rounded-[12px] bg-green-50 px-3 py-2 text-xs font-medium text-green-700">

                    <Check size={15} />

                    <span>
                      {appliedDiscount.code} applied (
                      {appliedDiscount.percentage}% off)
                    </span>

                  </div>
                )}

              </div>

              <div className="my-5 h-px bg-gray-200" />

              {/* DISCOUNT */}

              {appliedDiscount && (
                <div className="flex items-center justify-between text-sm">

                  <span className="text-gray-500">
                    Discount (
                    {appliedDiscount.percentage}%)
                  </span>

                  <span className="font-semibold text-green-600">
                    -${discountAmount.toFixed(2)}
                  </span>

                </div>
              )}

              {/* TOTAL */}

              <div
                className={`flex items-center justify-between ${
                  appliedDiscount ? "mt-4" : ""
                }`}
              >

                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-black">
                  ${finalPrice.toFixed(2)}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-mainblack text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Checkout
                <ArrowRight size={17} />
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}