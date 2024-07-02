import React from "react";
import SalesOrders from "@/components/OrderList/salesOrders";

const Inbox = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900 my-3">
            Recent Emails
          </p>
          {/* Recent Emails component  --> Pending */}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
