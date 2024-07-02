import Link from "next/link";
import React, { useEffect } from "react";

const OrderedProduct = ({ orders }) => {
  const bgColor = {
    "success":"green",
    "initiated":"yellow",
    "pending":"yellow",
    "cancelled":"red"
  }
  return (
    <>
      {orders.length > 0 ? (
        <div className="bg-white p-0 md:p-4 rounded-md w-full">
          {/* <div className=" flex items-center justify-between pb-6">
        <div className="flex items-center justify-between">
          <div className="flex bg-white items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              className="bg-white outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder="search..."
            />
          </div>
        </div>
      </div> */}
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order#
                      </th>
                      <th className="md:px-5 px-0 lg:block hidden py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>

                      <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <tr key={order.ordElement._id}>
                          <td className="md:px-5 px-0 py-5 border-b text-center border-gray-200 bg-white text-sm">
                            <Link
                              href={`/seller/orders/${order.ordElement._id}`}
                            >
                              <p className="text-gray-900 text-center">
                                {order.ordElement.order_id}
                              </p>
                            </Link>
                          </td>
                          <td className="md:px-5 px-0 py-5 border-b lmx:hidden border-gray-200 bg-white text-sm">
                            <Link
                              href={`/seller/orders/${order.ordElement._id}`}
                            >
                              <p className="text-gray-900 text-center">
                                {order.ordElement.email}
                              </p>
                            </Link>
                          </td>
                          <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link
                              href={`/seller/orders/${order.ordElement._id}`}
                            >
                              <p className="text-gray-900 text-center">
                                {new Date(
                                  order.ordElement.createdAt
                                ).toLocaleString("hi-In")}
                              </p>
                            </Link>
                          </td>

                          <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link
                              href={`/seller/orders/${order.ordElement._id}`}
                            >
                              <p className="text-gray-900 text-center">
                                ₹ {order.ordElement.amount}
                              </p>
                            </Link>
                          </td>
                          <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link
                              href={`/seller/orders/${order.ordElement._id}`}
                            >
                              <p
                                className={`text-gray-900 text-center bg-${bgColor[order.ordElement.status.toLowerCase()]}-400 p-1 rounded-full`}
                              >
                                {order.ordElement.status}
                              </p>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* {<div className="md:px-5 px-0 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900 text-center">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No Orders Available Currently</p>
      )}
    </>
  );
};

export default OrderedProduct;
