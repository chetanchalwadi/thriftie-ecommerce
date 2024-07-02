import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Dropdown from "./dropdown";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const Navbar = ({ cart, logout }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [menu, setmenu] = useState("hidden");
  const router = useRouter();

  const toggleDropDown = () => {
    if (menu == "hidden") {
      setmenu("block");
    } else {
      setmenu("hidden");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err) => {
      if (err) {
        localStorage.removeItem("token");
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    });
  }, [router.query]);

  return (
    <div className="sticky top-0 z-20">
      <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="h-10" alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!isLogin && (
              <Link
                href={"/login"}
                type="button"
                className="text-white mx-1 bg-orange-500 hover:bg-orange-800 focus:ring-1 focus:outline-none focus:ring-orange-100 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Login
              </Link>
            )}
            {!isLogin && (
              <Link
                href={"/seller/login"}
                type="button"
                className="text-white mx-1 hidden md:inline-block bg-black hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-orange-100 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Login as a Seller
              </Link>
            )}
            {isLogin && <Dropdown logout={logout} />}
            <Link href={"/checkout"}>
              <div className="shrink-0  relative">
                {Object.keys(cart).length > 0 && (
                  <span className="absolute bg-orange-600 md:top-0 md:left-9 left-5 lg:left-9 flex h-4 w-4 items-center justify-center rounded-full border text-sm font-medium text-white shadow sm:top-0">
                    {Object.keys(cart).length}
                  </span>
                )}
                <AiOutlineShoppingCart className="text-3xl md:mx-4" />
              </div>
            </Link>

            <button
              onClick={toggleDropDown}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center smx:absolute smx:right-0 smx:top-14 justify-between ${menu} w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href={"/tshirts"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Tshirts
                </Link>
              </li>
              <li>
                <Link
                  href={"/bottoms"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Bottoms
                </Link>
              </li>
              <li>
                <Link
                  href={"/footwear"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Footwear
                </Link>
              </li>
              <li>
                <Link
                  href={"/seller/login"}
                  className="hidden smx:block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Seller Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
