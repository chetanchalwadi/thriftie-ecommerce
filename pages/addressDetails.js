import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressDetails = ({ cart, subTotal }) => {
  const [disabled, setdisabled] = useState(true);
  const [user, setuser] = useState({});
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "contactNumber") {
      setContact(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinjson = await pins.json();
        if (Object.keys(pinjson.pincodes).includes(e.target.value)) {
          setCity(pinjson.pincodes[e.target.value][0]);
          setState(pinjson.pincodes[e.target.value][1]);
        }
      } else {
        setCity("");
        setState("");
      }
    }
    if (name && email && contact && address && pincode && state && city && Object.keys(cart).length > 0) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/");
        } else {
          setuser(decoded);
        }
      });
    } else {
      router.push("/login");
    }
  }, [router.query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let oid = Math.round(new Date() * Math.random());
    oid = oid.toString();
    const amount = subTotal.toString();
    const addressItems = [address, city, state, pincode];
    const finalAddress = addressItems.join(",");
    const userId = user.id;
    const formBody = { email, finalAddress, amount, oid, cart, userId,pincode };
    const placeOrder = async (resBody) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/preTransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      });
      let a = await res.json();
      if (res.status == "201") {
        toast.success("Order Successfully Placed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          localStorage.removeItem("cart");
          localStorage.removeItem("subt");
          router.push(`/order/${a.order.order_id}`);
        }, 2000);
      } else if(res.status == "202"){
        toast.error(a.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        toast.error("Cart Tampered! Please Try Again!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          localStorage.removeItem("cart");
          localStorage.removeItem("subt");
          router.push("/");
        }, 2000);
      }
    };
    placeOrder(formBody);
  };

  return (
    <form
      className="text-gray-600 body-font relative"
      method="POST"
      onSubmit={handleSubmit}
    >
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
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Checkout
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2 className="font-bold py-5">Delivery Details</h2>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  onChange={handleChange}
                  value={address}
                  id="address"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="contactNumber"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  onChange={handleChange}
                  value={contact}
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  onChange={handleChange}
                  value={city}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  onChange={handleChange}
                  value={state}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  PinCode
                </label>
                <input
                  onChange={handleChange}
                  value={pincode}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <input type="hidden" value={subTotal} />
          <button
            disabled={disabled}
            type="submit"
            className="disabled:bg-orange-400 my-16 group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
          >
            Pay {subTotal}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressDetails;
