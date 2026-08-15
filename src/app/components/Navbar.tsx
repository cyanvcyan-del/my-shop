"use client";

import Container from "./layout/Container";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  // Check whether user is logged in
  const checkLoginStatus = () => {
    if (typeof window === "undefined") return;

    const localUser = localStorage.getItem("verdea-current-user");
    const sessionUser = sessionStorage.getItem("verdea-current-user");

    const userData = localUser || sessionUser;

    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  };

  // Check login when Navbar loads
  useEffect(() => {
    checkLoginStatus();

    // This handles login/logout changes in the same tab
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    // This handles changes from another tab
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "verdea-current-user" ||
        event.key === null
      ) {
        checkLoginStatus();
      }
    };

    window.addEventListener("verdea-auth-change", handleAuthChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("verdea-auth-change", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("verdea-current-user");
    sessionStorage.removeItem("verdea-current-user");

    setCurrentUser(null);

    // Tell Navbar that authentication changed
    window.dispatchEvent(new Event("verdea-auth-change"));
  };

  return (
    <nav
      className="relative bg-mainS w-[95%] md:w-[95%]
        h-14 md:h-14 mx-auto
        rounded-full mt-4
        shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)]
        flex items-center justify-between
        px-3 md:px-0 z-50"
    >
      {/* Left side */}

      <div className="flex items-center gap-4 md:gap-16">
        <Link
          href="/"
          className="bg-mainT w-20 md:w-[6.4375rem] h-9 md:h-[2.625rem]
            rounded-full flex items-center justify-center
            ml-0 md:ml-2.5 font-black text-base md:text-xl
            transition-all duration-300 hover:scale-105 active:scale-105"
          title="Home"
        >
          Verdea
        </Link>

        <ul
          className="hidden md:flex items-center gap-6 md:gap-10 lg:gap-16
            text-base lg:text-base font-bold"
        >
          <li>
            <Link
              href="/#grouping"
              className="inline-block transition-all duration-300 ease-in-out hover:scale-110 active:scale-110"
            >
              Grouping
            </Link>
          </li>
            <li>
              <Link
                href="/products"
                className="inline-block transition-all duration-300 hover:scale-110 active:scale-110"
              >
               Products
              </Link>
            </li>

          <li>
            <Link
              href="/best-sellers"
              className="inline-block transition-all duration-300 ease-in-out hover:scale-110 active:scale-110"
            >
              Bestsellers
            </Link>
          </li>

          <li>
            <Link
              href="/about-us"
              className="inline-block transition-all duration-300 ease-in-out hover:scale-110 active:scale-110"
            >
              About us
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side */}

      <div className="flex items-center gap-2 md:gap-4">

        {/* Cart */}

        <Link
          href="/cart"
          className="bg-mainP-500 w-9 h-9 md:w-[2.625rem] md:h-[2.625rem]
            rounded-full flex items-center justify-center
            transition-all duration-300 hover:scale-110 active:scale-110"
          aria-label="Shopping cart"
        >
          <svg
            viewBox="0 -2.55 20.095 20.095"
            className="w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M437.249,829.36a1.874,1.874,0,0,0,1.72,1.633H447.1c.9,0,1.24-.72,1.626-1.633l1.93-4.382H440l-.136-.964h12.2l-2.262,5.346c-.678,1.556-1.213,2.66-2.709,2.66h-8.128a2.664,2.664,0,0,1-2.71-2.66l-.8-7.36h-3.484v-1h4.406Zm1.225,3.64a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,438.474,833Zm-.531,1.969h1V834h-1ZM446.474,833a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,446.474,833Zm-.531,1.969h1V834h-1Z"
                transform="translate(-431.973 -821)"
                fill="#111111"
              />
            </g>
          </svg>
        </Link>

        {/* ACCOUNT / LOGIN */}

        <div className="hidden md:block mr-0 md:mr-2.5">

          {!currentUser ? (
            <Link
              href="/sign-in"
              className="bg-mainblack h-9 md:h-[2.625rem]
                px-4 md:px-6 rounded-full
                text-white font-medium text-xs lg:text-sm
                flex items-center justify-center
                transition-all duration-300
                hover:scale-105 active:scale-105"
            >
              Log in | Sign up
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="bg-mainblack h-9 md:h-[2.625rem]
                  px-4 md:px-6 rounded-full
                  text-white font-medium text-xs lg:text-sm
                  flex items-center justify-center
                  transition-all duration-300
                  hover:scale-105 active:scale-105
                  outline-none"
              >
                Account
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    {currentUser.name}
                  </DropdownMenuLabel>

                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">
                      Favorite
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      href="/cart"
                      className="w-full"
                    >
                      Cart
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>

        {/* Mobile menu button */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-mainblack w-9 h-9 rounded-full
            flex items-center justify-center text-white
            transition-transform duration-300
            hover:scale-110 active:scale-110"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}

      <div
        className={`
          absolute top-full left-0 right-0 mt-2 mx-4
          bg-white rounded-2xl shadow-lg
          md:hidden overflow-hidden
          transition-all duration-300 ease-out origin-top
          ${
            isMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-75 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="p-4 flex flex-col gap-3">

          <ul className="flex flex-col gap-3 text-sm font-semibold">

            <li>
              <Link
                href="/#grouping"
                className="inline-block transition-all duration-300 hover:scale-110 active:scale-110"
              >
                Grouping
              </Link>
            </li>
              <li>
              <Link
                href="/products"
                className="inline-block transition-all duration-300 hover:scale-110 active:scale-110"
              >
               Products
              </Link>
            </li>

            <li>
              <Link
                href="/best-sellers"
                className="inline-block transition-all duration-300 hover:scale-110 active:scale-110"
              >
                Bestsellers
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className="inline-block transition-all duration-300 hover:scale-110 hover:text-mainP-500 active:scale-110 active:text-mainP-500"
              >
                About us
              </Link>
            </li>

          </ul>

          {/* Mobile Account */}

          {!currentUser ? (
            <Link
              href="/sign-in"
              className="bg-mainblack h-10 rounded-full
                text-white font-medium text-sm w-full
                flex items-center justify-center
                transition-all duration-300
                hover:scale-105 active:scale-105"
            >
              Log in | Sign up
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="bg-mainblack h-10 rounded-full
                  text-white font-medium text-sm w-full
                  flex items-center justify-center
                  transition-all duration-300
                  hover:scale-105 active:scale-105
                  outline-none"
              >
                Account
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                className="w-[calc(100vw-4rem)]"
              >
                <DropdownMenuGroup>

                  <DropdownMenuLabel>
                    {currentUser.name}
                  </DropdownMenuLabel>

                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">
                      Favorite
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      href="/cart"
                      className="w-full"
                    >
                      Cart
                    </Link>
                  </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log Out
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>
    </nav>
  );
}