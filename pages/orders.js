import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { BeatLoader } from "react-spinners";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getUsers = async (decoded) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decoded),
      });
      if (res.status == "200") {
        let a = await res.json();
        setOrders(a.orders.reverse());
      } else {
        setOrders([]);
        router.push("/login");
      }
      setLoading(false);
    };
    const token = localStorage.getItem("token");
    if (token) {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          getUsers(decoded);
        }
      });
    } else {
      router.push("/login");
    }
  }, [router.query]);

  const bgColor = {
    success: "green",
    initiated: "yellow",
    pending: "yellow",
    cancelled: "red",
  };
  return (
    <>
      {loading ? (
        <BeatLoader className="text-center items-center my-28" />
      ) : (
        <div className="min-h-screen">
          <h1 className="text-2xl font-semiboldbold text-center p-8">
            My Orders
          </h1>
          {orders.length <= 0 ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <p className="text-center py-5 ">
                  You donot have any orders right now.Happy Shopping!
                </p>
                <Link
                  href={"/"}
                  className="items-center justify-center text-white bg-blue-700 disabled:bg-slate-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start Shopping!
                </Link>
              </div>
            </>
          ) : (
            <div className="container mx-auto ">
              <div className="">
                <div className="px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Order#
                          </th>
                          <th className="md:px-5 px-0 lg:block hidden py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Purchased On
                          </th>

                          <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="md:px-5 px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="md:px-5 lmx:hidden px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => {
                          return (
                            <tr key={order.order_id}>
                              <td className="md:px-5 px-0 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <Link href={`/seller/orders/${order.order_id}`}>
                                  <p className="text-gray-900 text-center">
                                    {order.order_id}
                                  </p>
                                </Link>
                              </td>
                              <td className="md:px-5 px-0 py-5 border-b lmx:hidden border-gray-200 bg-white text-sm">
                                <Link href={`/seller/orders/${order.order_id}`}>
                                  <p className="text-gray-900 text-center">
                                    {Object.keys(order.products).length}
                                  </p>
                                </Link>
                              </td>
                              <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                                <Link href={`/seller/orders/${order.order_id}`}>
                                  <p className="text-gray-900 text-center">
                                    {new Date(order.createdAt).toLocaleString(
                                      "hi-In"
                                    )}
                                  </p>
                                </Link>
                              </td>

                              <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                                <Link href={`/seller/orders/${order.order_id}`}>
                                  <p className="text-gray-900 text-center">
                                    ₹ {order.amount}
                                  </p>
                                </Link>
                              </td>
                              <td className="md:px-5 px-0 py-5 border-b border-gray-200 bg-white text-sm">
                                <Link href={`/seller/orders/${order.order_id}`}>
                                  <p
                                    className={`text-gray-900 text-center bg-${
                                      bgColor[order.status.toLowerCase()]
                                    }-400 p-1 rounded-full`}
                                  >
                                    {order.status}
                                  </p>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap md:text-sm lmx:hidden text-xs text-center p-1 md:p-4">
                                <Link href={`/order/${order.order_id}`}>
                                  <button className="flex m-auto  text-white bg-orange-500 border-0 py-1 px-1 md:px-2 md:text-md text-xs md:font-semibold focus:outline-none hover:bg-orange-600 rounded">
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
