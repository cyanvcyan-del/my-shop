"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";

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

type CustomerInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
};

export default function Checkout() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<DiscountCode | null>(null);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("verdea-current-user");

    const sessionUser = sessionStorage.getItem(
      "verdea-current-user"
    );

    const currentUser = localUser || sessionUser;

    if (!currentUser) {
      router.replace("/sign-in");
      return;
    }

    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("verdea-cart") || "[]"
    );

    if (storedCart.length === 0) {
      router.replace("/cart");
      return;
    }

    setCartItems(storedCart);

    const storedDiscount = localStorage.getItem(
      "verdea-discount"
    );

    if (storedDiscount) {
      try {
        setDiscount(JSON.parse(storedDiscount));
      } catch {
        localStorage.removeItem("verdea-discount");
      }
    }
  }, [router]);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const discountAmount = discount
    ? subtotal * (discount.percentage / 100)
    : 0;

  const total = subtotal - discountAmount;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const updateCustomer = (
    field: keyof CustomerInfo,
    value: string
  ) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePlaceOrder = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (
      !customer.firstName.trim() ||
      !customer.lastName.trim() ||
      !customer.phone.trim() ||
      !customer.city.trim() ||
      !customer.address.trim() ||
      !customer.postalCode.trim()
    ) {
      setError(
        "Please fill in all delivery information."
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = `VRD-${Date.now()
        .toString()
        .slice(-8)}`;

      const order = {
        id: orderId,
        customer,
        paymentMethod,
        items: cartItems,
        subtotal,
        discount,
        discountAmount,
        total,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "verdea-last-order",
        JSON.stringify(order)
      );

      localStorage.removeItem("verdea-cart");
      localStorage.removeItem("verdea-discount");

      window.dispatchEvent(
        new Event("verdea-cart-change")
      );

      // موفقیت سفارش
      // کاربر به صفحه /order-success منتقل می‌شود
      router.push("/order-success");
    }, 1200);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-mainP-500 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-[95%] max-w-[1180px]">

        {/* BACK */}
        <Link
          href="/cart"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>

        {/* TITLE */}
        <div className="mt-7">
          <h1 className="text-2xl font-black md:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Complete your information to place your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]"
        >

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* DELIVERY */}
            <section className="rounded-[24px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainP-500">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="font-black">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* FIRST NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    First Name
                  </label>

                  <input
                    value={customer.firstName}
                    onChange={(event) =>
                      updateCustomer(
                        "firstName",
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                    placeholder="John"
                  />
                </div>

                {/* LAST NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Last Name
                  </label>

                  <input
                    value={customer.lastName}
                    onChange={(event) =>
                      updateCustomer(
                        "lastName",
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                    placeholder="Doe"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomer(
                        "phone",
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                    placeholder="09000000000"
                  />
                </div>

                {/* CITY */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    City
                  </label>

                  <input
                    value={customer.city}
                    onChange={(event) =>
                      updateCustomer(
                        "city",
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                    placeholder="Mashhad"
                  />
                </div>

                {/* POSTAL CODE */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Postal Code
                  </label>

                  <input
                    value={customer.postalCode}
                    onChange={(event) =>
                      updateCustomer(
                        "postalCode",
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                    placeholder="1234567890"
                  />
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Full Address
                  </label>

                  <textarea
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomer(
                        "address",
                        event.target.value
                      )
                    }
                    rows={4}
                    className="w-full resize-none rounded-[12px] border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

              </div>
            </section>

            {/* DELIVERY METHOD */}
            <section className="rounded-[24px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainP-500">
                  <Truck size={19} />
                </div>

                <div>
                  <h2 className="font-black">
                    Delivery Method
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Free delivery on every order.
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-[16px] border border-black bg-white p-4">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-black">
                      <div className="h-2.5 w-2.5 rounded-full bg-black" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Standard Delivery
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Same day delivery
                      </p>
                    </div>

                  </div>

                  <span className="text-sm font-bold text-green-600">
                    Free
                  </span>

                </div>
              </div>
            </section>

            {/* PAYMENT */}
            <section className="rounded-[24px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainP-500">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="font-black">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Select how you want to pay.
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-col gap-3">

                {/* CASH */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("cash")
                  }
                  className={`rounded-[16px] border p-4 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-black bg-white"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "cash"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "cash" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-black" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Pay when your order arrives.
                        </p>
                      </div>

                    </div>

                    {paymentMethod === "cash" && (
                      <Check size={18} />
                    )}

                  </div>
                </button>

                {/* CARD */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  className={`rounded-[16px] border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-black bg-white"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "card"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-black" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Card Payment
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Simulated online payment.
                        </p>
                      </div>

                    </div>

                    {paymentMethod === "card" && (
                      <Check size={18} />
                    )}

                  </div>
                </button>

              </div>
            </section>

          </div>

          {/* RIGHT SUMMARY */}
          <aside className="h-fit rounded-[24px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:p-6 lg:sticky lg:top-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainP-500">
                <ShoppingBag size={19} />
              </div>

              <div>
                <h2 className="font-black">
                  Your Order
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""}
                </p>
              </div>

            </div>

            {/* PRODUCTS */}
            <div className="mt-5 flex max-h-[300px] flex-col gap-4 overflow-y-auto">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-white">

                    <img
                      src={`/${item.image}`}
                      alt={item.title}
                      className="h-full w-full object-contain p-1.5"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="line-clamp-1 text-sm font-semibold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="text-sm font-bold">
                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            <div className="my-5 h-px bg-gray-200" />

            {/* SUBTOTAL */}
            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold">
                ${subtotal.toFixed(2)}
              </span>

            </div>

            {/* SHIPPING */}
            <div className="mt-3 flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Delivery
              </span>

              <span className="font-semibold text-green-600">
                Free
              </span>

            </div>

            {/* DISCOUNT */}
            {discount && (
              <div className="mt-3 flex items-center justify-between text-sm">

                <span className="text-gray-500">
                  Discount (
                  {discount.percentage}%)
                </span>

                <span className="font-semibold text-green-600">
                  -$
                  {discountAmount.toFixed(2)}
                </span>

              </div>
            )}

            <div className="my-5 h-px bg-gray-200" />

            {/* TOTAL */}
            <div className="flex items-center justify-between">

              <span className="font-bold">
                Total
              </span>

              <span className="text-2xl font-black">
                ${total.toFixed(2)}
              </span>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-4 rounded-[12px] bg-red-50 px-3 py-3 text-xs font-medium text-red-600">
                {error}
              </div>
            )}

            {/* PLACE ORDER */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order

                  <ArrowLeft
                    size={17}
                    className="rotate-180"
                  />
                </>
              )}

            </button>

          

          </aside>

        </form>

      </div>
    </main>
  );
}