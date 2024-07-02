import OrderedProduct from "@/components/OrderedProducts/orderedProduct";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { BeatLoader } from "react-spinners";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("stoken");
    jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          router.push("/seller/login");
        } else {
          getSelletOrders(decoded.id);
        }
      }
    );
  }, []);

  const getSelletOrders = async (sellerId) => {
    setLoading(true);
    const resBody = { sellerId };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/seller/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    const a = await res.json();
    if (res.status == "200") {
      let ords = a.orders;
      setOrders(ords.reverse());
    } else {
      setOrders([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex flex-col items-center justify-center h-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900 my-3">
            Recent Orders
          </p>

          {loading?<BeatLoader className="py-7"/>:<OrderedProduct orders={orders} />}
        </div>
      </div>
    </div>
  );
};

export default Orders;
