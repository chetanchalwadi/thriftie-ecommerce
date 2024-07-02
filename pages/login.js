import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPass, setIsPass] = useState(null);
  const [isUser, setIsUser] = useState(null);

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  },[])

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { email, password };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/userLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    if (res.status=="200") {
      setIsUser(true);
      setIsPass(true);
      const data = await res.json();
      localStorage.setItem("token",data.usertoken);
      localStorage.setItem("user",JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      router.push("/");
    } else if(res.status == "400"){
      setIsPass(false);
      setPassword("");
    }else{
      setIsUser(false)
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form
      className="flex h-140 w-screen items-center overflow-hidden px-2"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign in
          </h1>
          <p className="text-gray-500">Sign in to access your account</p>
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

        <div>
          <div className="relative mt-2 w-full">
            <input
              value={password}
              type="password"
              name="password"
              onChange={handleChange}
              id="password"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Enter Your Password"
            />
            <label
              htmlFor="password"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Password
            </label>
          </div>
          {!isPass && isPass != null && (
            <p className="text-red-600 text-sm">Invalid Credentials!</p>
          )}
        </div>
        {!isUser && isUser != null && (
            <p className="text-red-600 text-base text-center">User does not Exists, Sign up</p>
          )}
        <div className="flex w-full items-center">
          <button
            type="submit"
            className="shrink-0 inline-block w-36 rounded-lg bg-orange-500 py-3 font-bold text-white"
          >
            Login
          </button>
          <Link
            className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
            href="/forgotPassword"
          >
            Forgot your password?
          </Link>
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
  );
};

export default Login;
