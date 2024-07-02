import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isPass, setisPass] = useState(null);

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confpassword") {
      setConfPassword(e.target.value);
    } else if (e.target.name == "contactNumber") {
      setContactNumber(e.target.value);
    }
  };

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == confPassword) {
      setisPass(true);
      const formBody = { name, contactNumber, email, password };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/userSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      if (res.status == "201") {
        toast.success("User Created Sucessfully! Please Login Again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
        setContactNumber("");
        setName("");
        setConfPassword("");
        setPassword("");
        setTimeout(() => {
          router.push("/login");
        }, 2000); 
      }else{
        toast.info("User Already Exists!", {
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
    } else {
      setisPass(false);
      setConfPassword("");
      setPassword("");
    }
  };

  return (
    <form
      className="flex h-150 w-screen items-center overflow-hidden px-2"
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
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign up
          </h1>
          <p className="text-gray-500">Sign up to create an account</p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              onChange={handleChange}
              name="name"
              id="name"
              value={name}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Enter Your Name"
            />
            <label
              htmlFor="name"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Name{" "}
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              onChange={handleChange}
              name="contactNumber"
              id="contactNumber"
              value={contactNumber}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Enter Your Contact Number"
            />
            <label
              htmlFor="contactNumber"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Contact Number{" "}
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              value={email}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Enter Your Email"
            />
            <label
              htmlFor="email"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Email{" "}
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Enter Your Password"
              value={password}
            />
            <label
              htmlFor="password"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Password
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              onChange={handleChange}
              name="confpassword"
              id="confpassword"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Confirm Password"
              value={confPassword}
            />
            <label
              htmlFor="confpassword"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Confirm Password
            </label>
          </div>
          {!isPass && isPass != null && (
            <p className="text-red-600 text-sm">Password does not match</p>
          )}
        </div>
        <div className="flex w-full items-center">
          <button
            type="submit"
            className="shrink-0 inline-block w-36 rounded-lg bg-orange-500 py-3 font-bold text-white"
          >
            Sign up
          </button>
          <Link
            className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
            href="/forgotPassword"
          >
            Forgot your password?
          </Link>
        </div>
        <p className="text-center text-gray-600">
          Already have an account?
          <Link
            href="/login"
            className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
