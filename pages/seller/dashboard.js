import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import SellerDashboard from "@/components/sellerDashboard.js/sellerDashboard";
import orders from "../api/seller/orders";
import { BeatLoader } from "react-spinners";

const Dashboard = () => {
  const router = useRouter();
  const [sales, setSales] = useState(0);
  const [Orders, setOrders] = useState(0);
  const [Profit, setProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  useEffect(() => {
    setLoading(true);
    const stoken = localStorage.getItem("stoken");
    if (stoken) {
      jwt.verify(stoken, process.env.NEXT_PUBLIC_JWT_SECRET, (err,decoded) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/seller/login");
        }else{
          getSales(decoded.id);
        }
      });
    } else {
      router.push("/seller/login");
    }
  }, [router.query]);
  
  const getSales = async(sellerId)=>{
    
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
      setRecentOrders(a.orders.reverse().slice(0,5))
      setOrders(a.orders.length);
      let successfullOrders = 0;
      let profitOnOrders = 0;
      for(let i in a.orders){
        const od = a.orders[i].ordElement;
        if (od.status == "Success") {
          successfullOrders++;
          profitOnOrders += od.amount;
        }
      }
      setProfit(profitOnOrders);
      setSales(successfullOrders);
    }else{
      setSales(0);
      setOrders(0);
      setProfit(0);
    }
    setLoading(false);
  }

  return (
    <>
      {loading?<BeatLoader className="text-center items-center mt-52"/>:<SellerDashboard recentOrders={recentOrders} sales={sales} orders={Orders} profit={Profit}/>}
    </>
  );
};

export default Dashboard;
