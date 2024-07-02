import React from "react";
import SalesOrders from "../OrderList/salesOrders";
import OrderedProduct from "../OrderedProducts/orderedProduct";

const SellerDashboard = ({recentOrders,sales,orders,profit}) => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900">Sales</p>
            <h1 className="py-2 text-orange-400 text-xl">{sales}</h1>
          </div>
          <div className="flex flex-col items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900">Orders</p>
            <h1 className="py-2 text-orange-400 text-xl">{orders}</h1>
          </div>
          <div className="flex flex-col items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900">Profit</p>
            <h1 className="py-2 text-orange-400 text-xl">₹ {profit}</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full my-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900 my-3">Recent Orders</p>
        <OrderedProduct orders={recentOrders}/>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
