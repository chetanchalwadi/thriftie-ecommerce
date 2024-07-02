import React from "react";
import Link from "next/link";

const SalesOrders = () => {
  return (
    <>
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <div className="overflow-x-auto mx-0 min-w-fit lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-visible">
                <table className=" md:min-w-full  text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 md:text-sm text-xs w-1/5 text-center py-4"
                      >
                        #Order Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 md:text-sm text-xs  text-center py-4"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Purchased on
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap  md:text-sm text-xs text-center md:p-4 p-1 font-medium">
                        #Oid-1234
                      </td>
                      <td className="whitespace-normal md:text-sm text-xs text-justify md:max-w-[15vw] p-1 md:p-4">
                        <div className=" text-center max-w-[30vw]">3</div>
                      </td>
                      <td className="whitespace-nowrap md:text-sm text-xs text-center md:p-4 p-1">
                        ₹200.0
                      </td>
                      <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">
                        12 Aug 2023
                      </td>
                      <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">
                        <Link href={"/seller/orders/1234"}>
                          <button className="flex m-auto  text-white bg-orange-500 border-0 py-1 px-1 md:px-2 md:text-md text-xs md:font-semibold focus:outline-none hover:bg-orange-600 rounded">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesOrders;
