import { Inter } from "next/font/google";
import Head from "next/head";
import Category from "../components/category.js";
import Carousel from "../components/carousel.js";
import { initFlowbite } from "flowbite";
import NewArrival from "@/components/newArrival.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thriftie - Feel Trendy. Feel Authentic.</title>
        <meta
          name="description"
          content="Thriftie - Feel Trendy. Feel Authentic."
        />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <Carousel />
      <Category />
      <NewArrival/>
    </div>
  );
}
