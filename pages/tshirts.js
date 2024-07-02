import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="md:text-gray-600 body-font">
        <div className="container py-14 px-20 md:px-20 lg:px- md:py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && <p>Sorry all the TShirts are currently out of stock. New Stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((prod) => {
              return (
                <div key={products[prod]._id} className="lg:w-1/3 xl:w-1/4 md:w-1/2 p-4 cursor-pointer w-full hover:scale-105 md:text-left text-center">
                  <Link
                    href={`/product/${products[prod].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="h-[30vh] sm:h-[60vh] md:h-[20vh] lg:h-[36vh] block md:m-0 m-auto"
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
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find({category:"TSHIRT"});
  let tshirts = {};
    for(let item of products){
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
                tshirts[item.title].color.push(item.color);
            }
            if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
                tshirts[item.title].size.push(item.size);
            }
            
        }else{
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if(item.availableQty>0){
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }else{
              tshirts[item.title].color = [];
                tshirts[item.title].size = [];
            }
        }
    }
  return {
    props: { products:JSON.parse(JSON.stringify(tshirts)) },
  };
}
export default Tshirts;