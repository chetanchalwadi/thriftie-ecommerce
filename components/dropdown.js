import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Dropdown = ({logout}) => {
  const [hidden, sethidden] = useState("hidden")
  const toggleDropDown = ()=>{
    if(hidden == "hidden"){
      sethidden("block")
    }else{
      sethidden("hidden")
    }
  }

  
  return (
    <div>
      <FaUserCircle
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropDown}
        className="focus:ring-4 focus:outline-none focus:ring-orange-300 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 text-3xl cursor-pointer"
        type="button"
      >
        Dropdown button{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </FaUserCircle>

      <div
        id="dropdown"
        className={`z-10 absolute ${hidden} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 right-4`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Orders
            </Link>
          </li>
          <li onClick={()=>logout()}>
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
