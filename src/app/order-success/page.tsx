"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  ArrowRight,
} from "lucide-react";

type Order = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
  };
  paymentMethod: string;
  total: number;
  discountAmount: number;
};

export default function CheckoutSuccess() {
  const [order, setOrder] =
    useState<Order | null>(null);

  useEffect(() => {
    const storedOrder =
      localStorage.getItem(
        "verdea-last-order"
      );

    if (!storedOrder) {
      return;
    }

    try {
      setOrder(JSON.parse(storedOrder));
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-mainP-500 px-4 py-10">

      <div className="w-full max-w-[650px]">

        {/* SUCCESS CARD */}

        <div className="rounded-[28px] bg-mainT p-6 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-10">

          {/* ICON */}

          <div className="flex justify-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

              <CheckCircle2
                size={48}
                strokeWidth={1.7}
                className="text-green-600"
              />

            </div>

          </div>

          {/* TITLE */}

          <div className="mt-6 text-center">

            <h1 className="text-2xl font-black md:text-3xl">
              Order Confirmed!
            </h1>

            <p className="mx-auto mt-3 max-w-[450px] text-sm leading-6 text-gray-500">
              Thank you for your order.
              Your delicious Verdea meal
              is now being prepared.
            </p>

          </div>

          {/* ORDER ID */}

          {order && (
            <div className="mt-7 rounded-[18px] bg-white p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainP-500">

                  <Package size={19} />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Order Number
                  </p>

                  <p className="mt-1 text-sm font-black">
                    {order.id}
                  </p>

                </div>

              </div>

              <div className="my-5 h-px bg-gray-200" />

              {/* CUSTOMER */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <p className="text-xs text-gray-500">
                    Customer
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {order.customer.phone}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    City
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {order.customer.city}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Payment
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {order.paymentMethod ===
                    "cash"
                      ? "Cash on Delivery"
                      : "Card Payment"}
                  </p>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="mt-5">

                <p className="text-xs text-gray-500">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm font-semibold leading-6">
                  {order.customer.address}
                </p>

              </div>

              <div className="my-5 h-px bg-gray-200" />

              {/* DISCOUNT */}

              {order.discountAmount > 0 && (
                <div className="flex items-center justify-between text-sm">

                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-semibold text-green-600">
                    -$
                    {order.discountAmount.toFixed(
                      2
                    )}
                  </span>

                </div>
              )}

              {/* TOTAL */}

              <div className="mt-4 flex items-center justify-between">

                <span className="font-bold">
                  Total Paid
                </span>

                <span className="text-xl font-black">
                  ${order.total.toFixed(2)}
                </span>

              </div>

            </div>
          )}

          {/* DELIVERY MESSAGE */}

          <div className="mt-5 rounded-[16px] bg-green-50 p-4 text-center">

            <p className="text-sm font-semibold text-green-700">
              Your order will be delivered
              today.
            </p>

            <p className="mt-1 text-xs text-green-600">
              Thank you for choosing Verdea.
            </p>

          </div>

          {/* BUTTONS */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/cart"
              className="flex h-12 flex-1 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-black transition hover:bg-gray-50"
            >
              View Cart
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}