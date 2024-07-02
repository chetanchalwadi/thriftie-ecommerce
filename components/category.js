import React from "react";
import Link from "next/link";

const Category = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-3 py-3 md:px-20 md:py-24 mx-auto">
          <div className="flex flex-wrap md:justify-center -m-4">
            <Link href={"/tshirts"} className="p-4 md:w-1/3 lg:w-1/3 w-1/2">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-96 md:h-36 w-full object-cover object-center"
                  src="https://www.mydesignation.com/wp-content/uploads/2019/08/malayali-tshirt-mydesignation-mockup-image-latest-golden-.jpg"
                  alt="blog"
                />
                <div className="p-1 text-center flex flex-col">
                  <h1 className="title-font text-lg font-medium text-gray-900">
                    SHIRTS
                  </h1>
                </div>
              </div>
            </Link>
            <Link href={"/bottoms"} className="p-4 md:w-1/3 lg:w-1/3 w-1/2">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-96 md:h-36 w-full object-cover object-center"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAfNDlvyEqQQua4z_qmZUO12ODU36hzaZ3Q&usqp=CAU"
                  alt="blog"
                />
                <div className="p-1 text-center flex flex-col">
                  <h1 className="title-font text-lg font-medium text-gray-900">
                    BOTTOMS
                  </h1>
                </div>
              </div>
            </Link>
            <Link href={"/footwear"} className="p-4 md:w-1/3 lg:w-1/3 w-1/2">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-96 md:h-36 w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="blog"
                />
                <div className="p-1 text-center flex flex-col">
                  <h1 className="title-font text-lg font-medium text-gray-900">
                    FOOTWEAR
                  </h1>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
