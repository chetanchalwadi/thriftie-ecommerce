import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    const formBody = {
      email,
      sendMail: true,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    const a = await res.json();
    if (a.success) {
        toast.success(a.message, {
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
            router.push("/login");
          }, 2000);
    } else {
      console.log("Error sending mail");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (cpassword == password) {
      const formBody = {
        password,
        sendMail: false,
        token: router.query.token,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      const a = await res.json();
      if (a.success) {
        toast.success(a.message, {
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
          router.push("/login");
        }, 2000);
      } else {
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
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
      }
    } else {
    }
  };

  return (
    <div>
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
      {!router.query.token && (
        <form
          className="flex h-140 w-screen items-center overflow-hidden px-2"
          method="POST"
          onSubmit={handleEmail}
        >
          <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
            <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
            <div className="mx-auto mb-2 space-y-3">
              <h1 className="text-center text-3xl font-bold text-gray-700">
                Forgot Password
              </h1>
              <p className="text-gray-500 text-center">
                Enter your Email to get otp!
              </p>
            </div>

            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
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

            <div className="w-full items-center text-center">
              <button
                type="submit"
                className="shrink-0 inline-block w-36 rounded-lg bg-orange-500 py-3 font-bold text-white text-center"
              >
                Verify
              </button>
            </div>
            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                href="/signup"
                className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      )}
      {router.query.token && (
        <form
          className="flex h-140 w-screen items-center overflow-hidden px-2"
          method="POST"
          onSubmit={handleResetPassword}
        >
          <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
            <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
            <div className="mx-auto mb-2 space-y-3">
              <h1 className="text-center text-3xl font-bold text-gray-700">
                Reset Password
              </h1>
              <p className="text-gray-500 text-center">
                Enter your New Password here!
              </p>
            </div>

            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  value={password}
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Enter Your Password"
                />
                <label
                  htmlFor="password"
                  className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                >
                  {" "}
                  Enter Your Password{" "}
                </label>
              </div>
            </div>
            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  name="cpassword"
                  onChange={handleChange}
                  id="cpassword"
                  value={cpassword}
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Confirm Your Password"
                />
                <label
                  htmlFor="cpassword"
                  className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                >
                  {" "}
                  Confirm Your Password{" "}
                </label>
              </div>
            </div>

            <div className="w-full items-center text-center">
              <button
                disabled={
                  password == "" || cpassword == "" || password != cpassword
                }
                type="submit"
                className="disabled:bg-orange-300 shrink-0 inline-block w-36 rounded-lg bg-orange-500 py-3 font-bold text-white text-center"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
