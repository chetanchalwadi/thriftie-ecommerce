import ProductForm from "@/components/ProductForm.js/productForm";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const AddProductForm = () => {
  const [userId,setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("stoken");
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err,decoded) => {
      if (err) {
        router.push("/seller/login");
      }else{
        setUserId(decoded.id);
      }
    });
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex flex-col items-center justify-center h-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900 my-3">
            Add New Product
          </p>
          <ProductForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
