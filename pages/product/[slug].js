import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Custom404 from "../not-found";

const Slug = ({ addToCart, product, variants, error }) => {
  const router = useRouter();
  const slug = router.query;
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  const checkServicebility = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinjson = await pins.json();
    if (Object.keys(pinjson.pincodes).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is Serviceble", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error("Sorry,your pincode is not serviceble", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onPinChange = (e) => {
    setPin(e.target.value);
  };

  useEffect(() => {
    if (!error) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [router.query]);

  const refreshVariant = (newcolor, newsize) => {
    let href = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;

    if (href) {
      router.push(href);
    }
  };
  if(error==404){
    return <Custom404/>
  }
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto lg:px-0 md:px-24 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                H&M
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {`${product.title} (${size}/${
                  color && color.charAt(0).toUpperCase() + color.slice(1)
                })`}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).map((item, index) => {
                    return (
                      Object.keys(variants[item]).includes(size) && (
                        <Link
                          href={`/product/${variants[item][size]["slug"]}`}
                          key={index}
                          className={`border-2 colorbutton ml-1 rounded-full w-6 h-6 focus:outline-none ${
                            color === item ? "border-black" : "border-gray-300"
                          }`}
                          style={{ backgroundColor: item }}
                        ></Link>
                      )
                    );
                  })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={(e) => refreshVariant(color, e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                      defaultValue={size}
                      key={size}
                    >
                      {color &&
                        Object.keys(variants[color]).map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty > 0 ? (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                ) : (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of Stock!
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() =>
                    addToCart(
                      slug.slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color,
                      product.img
                    )
                  }
                  className="flex ml-4 text-white disabled:bg-orange-300 bg-orange-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-orange-600 rounded"
                >
                  ADD TO BAG
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() =>
                    addToCart(
                      slug.slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color,
                      product.img
                    )
                  }
                  className="flex ml-4 disabled:bg-orange-300 text-white bg-orange-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-orange-600 rounded"
                >
                  <Link href={"/checkout"}>BUY NOW</Link>
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-2 sm:ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  className="px-2 border-2 border-grey-400 rounded-md"
                  type="text"
                  name="pincode"
                  onChange={onPinChange}
                  value={pin}
                  id="pincode"
                />
                <button
                  className=" text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                  onClick={checkServicebility}
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3">
                  Sorry, we don't deliver here!
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 text-sm mt-3">
                  This pincode is serviceble!
                </div>
              )}
            </div>
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
  const product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: {
        error: 404,
      },
    };
  }
  const variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
export default Slug;
