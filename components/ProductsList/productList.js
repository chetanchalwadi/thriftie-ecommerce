import React from "react";
import Link from "next/link";

const ProductList = ({ products }) => {
  return (
    <div className="container sm:px-0 py-0 md:px-1 md:py-6 mx-auto text-center">
      <div className="flex flex-wrap justify-evenly">
        {Object.keys(products).length == 0 && (
          <p>You Do not Have Any Products Right Now.</p>
        )}
        {Object.keys(products).map((prod) => {
          return (
            <div
              key={products[prod]._id}
              className="xl:w-1/3 lg:w-1/2 md:w-full w-1/2 p-4 cursor-pointer sm:text-center md:text-left text-center"
            >
              <span
                className="block relative rounded overflow-hidden"
              >
                <img
                  alt={products[prod].desc}
                  className="h-[20vh] sm:h-[30vh] md:h-[30vh] lg:h-[36vh] block m-auto"
                  src={products[prod].img}
                />
              </span>
              <div className="flex justify-around items-center text-xs">
                <div className="mt-4">
                  <h2 className="md:text-gray-900 title-font md:text-lg font-medium">
                    {products[prod].slug}
                  </h2>
                  <p className="mt-1 mr-2 inline-block">
                    ₹{products[prod].price}
                  </p>
                </div>
                <div>
                  <p className="mt-1 mr-2">Qty:{products[prod].availableQty}</p>
                  <button className="mt-3 inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
