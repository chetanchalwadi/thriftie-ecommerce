import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";

const Profile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  

  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
      if (err) {
        router.push("/");
      } else {
        console.log(decoded);
        const getUser = async (decoded) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/getUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(decoded),
            }
          );
          if (res.status == "200") {
            let a = await res.json();
            const user = a.user[0];
            setName(user.name);
            setEmail(user.email);
            setPhone(user.contactNumber);
            if (user.address) {
              setAddress(user.address);
            }
            if (user.pincode) {
              setPincode(user.pincode)
            }
          }
        };
        getUser(decoded);
      }
    });
  }, [router.query]);

  const handlechange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      name,
      pincode,
      phone,
      password,
      cpassword,
      npassword,
      address,
    };

    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, token: localStorage.getItem("token") }),
    });
    let resp = await u.json();
    console.log(resp);
    if(resp.fulfilled=='both'){
      toast.success("Successfully Updated.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='pass'){
      toast.warn("Only password updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='onlypass'){
      toast.success("Password Successfully updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='nopass'){
      toast.error(resp.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='details'){
      toast.warn("Only Details are Updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='none'){
      toast.error("Some Error Occured, Nothing Updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='onlydetail'){
      toast.success("Details are Successfully Updated", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='nodetail'){
      toast.error(resp.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else if(resp.fulfilled=='not'){
      toast.error(resp.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
     else{
      toast.error(resp.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
  
     setPassword('');
     setNpassword('');
     setCpassword('');
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
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
      <div className="container mx-auto my-9 px-3 md:px-16">
        <div className="text-3xl text-center my-8 font-bold">
          Update your Account
        </div>
        <Head>
          <title>My Account - Thriftie.com</title>
        </Head>
        <h2 className=" font-semibold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2 ">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handlechange}
                value={name}
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email <span className="text-xs">(Can not be Changed)</span>
              </label>
              <input
                type="email"
                id="email"
                onChange={handlechange}
                value={email}
                name="Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:outline-none"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              cols={30}
              rows={2}
              type="text"
              onChange={handlechange}
              value={address}
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 focus:outline-none ease-in-out"
            />
          </div>
        </div>

        <div className="mx-auto flex my-2 mb-6">
          <div className="px-2 w-1/2">
            <div>
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>

              <input
                type="text"
                id="phone"
                placeholder="Your 10 digit phone number"
                onChange={handlechange}
                value={phone}
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 focus:outline-none transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div>
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pin Code
              </label>

              <input
                type="text"
                id="pincode"
                onChange={handlechange}
                value={pincode}
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 focus:outline-none ease-in-out"
              />
            </div>
          </div>
        </div>
        <h2 className=" font-semibold text-xl">2. Change Password</h2>

        <div className="mx-auto flex my-2 ">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handlechange}
                value={password}
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="npassword"
                className="leading-7 text-sm text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="npassword"
                onChange={handlechange}
                value={npassword}
                name="npassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                onChange={handlechange}
                value={cpassword}
                name="cpassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="mx-4 my-2 flex justify-center ">
          <button
            className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded "
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
