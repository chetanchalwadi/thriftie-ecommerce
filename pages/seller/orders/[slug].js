import Order from "@/models/Order";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderedProduct from "@/models/OrderedProduct";
import Product from "@/models/Product";

const MyOrder = ({ order, ordProduct }) => {
  console.log(ordProduct);
  const router = useRouter();
  const [verified, setVerified] = useState(true);
  const [status, setstatus] = useState("Pending");

  useEffect(() => {
    const stoken = localStorage.getItem("stoken");
    jwt.verify(stoken, process.env.NEXT_PUBLIC_JWT_SECRET, (err) => {
      if (err) {
        localStorage.removeItem("stoken");
        setVerified(false);
        router.push("/seller/login");
      } else {
        setVerified(true);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resBody = { status, oid: order.order_id, opid: router.query.slug };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/seller/updateStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    const a = await res.json();
    if (res.status == "201") {
      toast.success(a.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/seller/orders");
      }, 2000);
    } else {
      toast.error(a.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="items-center justify-center h-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
            {verified && (
              <div className="py-14 px-4 md:px-6">
                <div className="flex justify-between flex-col md:flex-row items-center">
                  <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                      Order #{order.order_id}
                    </h1>
                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("hi-In") +
                        " - " +
                        new Date(order.createdAt).toLocaleTimeString("hi-In")}
                    </p>
                  </div>
                  <div className="p-4">
                    <form
                      className="flex flex-col items-center"
                      method="POST"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <p className="text-center">Status</p>
                        <select
                          required
                          value={status}
                          name="status"
                          id="status"
                          onChange={(e) => setstatus(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="Initiated">Initiated</option>
                          <option value="Pending">Pending</option>
                          <option value="Success">Success</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 disabled:bg-slate-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            className="w-full hidden md:block"
                            src={ordProduct.img}
                            alt="dress"
                          />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                              {ordProduct.title}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-800">
                                  Size:{" "}
                                </span>{" "}
                                {ordProduct.size}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-800">
                                  Color:{" "}
                                </span>
                                {ordProduct.color}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base dark:text-white xl:text-lg leading-6">
                              ₹{ordProduct.price}.00{" "}
                            </p>
                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                              {order.qty}
                            </p>
                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                              ₹{ordProduct.price * order.qty}.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                          Summary
                        </h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          <div className="flex justify-between w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                              ₹{order.amount}.00
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                            ₹{order.amount}.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Shipping Details
                    </h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                      <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 7L12 13L21 7"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="cursor-pointer text-sm leading-5 ">
                            {order.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex flex-wrap lg:flex-nowrap justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                              Shipping Address
                            </p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {order.address}
                            </p>
                          </div>
                          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                              Billing Address
                            </p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {order.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const foundOrder = await OrderedProduct.find({ _id: context.query.slug });
  return {
    props: {
      order: JSON.parse(JSON.stringify(foundOrder))[0],
      ordProduct: JSON.parse(JSON.stringify(foundOrder[0].product)),
    },
  };
}

export default MyOrder;
