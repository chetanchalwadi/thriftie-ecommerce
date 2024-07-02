import Link from "next/link";
import React, { useState } from "react";

const Checkout = ({
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  charges,
}) => {
  return (
    <div className="bg-gray-100 py-6 sm:py-16 lg:py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center">
            <h2>Your Cart is Empty!</h2>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-md md:mt-12">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {Object.keys(cart).map((k) => {
                      return(
                      <li key={k} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0 relative">
                          <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                            {cart[k].qty}
                          </span>
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={cart[k].img}
                            alt=""
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {cart[k].name}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                {cart[k].size}-{cart[k].variant}
                                
                              </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                ₹{cart[k].price}
                              </p>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <div className="mx-auto flex h8 items-strech text-grey-600">
                              <button onClick={()=>removeFromCart(k,1)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 py-2 transition hover:bg-black hover:text-white">
                                -
                              </button>
                              <div className="flex w-full items-center justify-center bg-gray-100 px-4 py-2 text-xs uppercase transition">
                                {cart[k].qty}
                              </div>
                              <button onClick={()=>addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 py-2 transition hover:bg-black hover:text-white">
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>);
                    })}
                  </ul>
                </div>

                <div className="mt-6 space-y-3 border-t border-b py-8">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{subTotal}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900 line-through">
                      ₹{charges}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">₹</span>{" "}
                    {subTotal}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link
                  href={"/addressDetails"}
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Place Order
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
