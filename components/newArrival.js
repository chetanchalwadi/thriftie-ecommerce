import React, { useEffect, useState } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";

const NewArrival = () => {
  const [products, setproducts] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/newArrival`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == "200") {
        let a = await res.json();
        let prods = a.products;
        let finalProds = {};
        for (let item of prods) {
          if (item.title in finalProds) {
            if (
              !finalProds[item.title].color.includes(item.color) &&
              item.availableQty > 0
            ) {
              finalProds[item.title].color.push(item.color);
            }
            if (
              !finalProds[item.title].size.includes(item.size) &&
              item.availableQty > 0
            ) {
              finalProds[item.title].size.push(item.size);
            }
          } else {
            finalProds[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
              finalProds[item.title].color = [item.color];
              finalProds[item.title].size = [item.size];
            } else {
              finalProds[item.title].color = [];
              finalProds[item.title].size = [];
            }
          }
        }
        setproducts(finalProds);
      } else {
        setproducts({});
      }
    };
    getProducts();
  }, []);

  return (
    <section className="md:text-gray-600 body-font text-center">
      <div>
        <h2 className="font-bold text-orange-500 py-2 text-5xl sm:text-7xl">
          New Arrivals
        </h2>
        <p className="text-gray-500">
          Be the first to wear the newest trends in town
        </p>
      </div>
      <div className="container sm:px-0 py-5 md:px-20 md:py-24 mx-auto text-center">
        <div className="flex flex-wrap justify-center">
          {Object.keys(products).reverse().map((prod) => {
            return (
              <div
                key={products[prod]._id}
                className="lg:w-1/3 xl:w-1/4 md:w-1/3 w-1/2 p-4 cursor-pointer hover:scale-105 sm:text-center md:text-left text-center"
              >
                <Link
                  href={`/product/${products[prod].slug}`}
                  className="block relative rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="h-[22vh] sm:h-[48vh] md:h-[20vh] lg:h-[36vh] block md:m-0 m-auto"
                    src={products[prod].img}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="md:text-gray-500 md:text-xs tracking-widest title-font mb-1">
                    {products[prod].category}
                  </h3>
                  <h2 className="md:text-gray-900 title-font md:text-lg font-medium">
                    {products[prod].title}
                  </h2>
                  <p className="mt-1">₹{products[prod].price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
