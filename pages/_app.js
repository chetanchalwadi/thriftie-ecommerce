import "@/styles/globals.css";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router.js";
import Sidebar from "@/components/Sidebar/sidebar.js";
import jwt from "jsonwebtoken";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLogin,setSellerLogin] = useState(false);
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [charges, setCharges] = useState(0);
  const [key, setKey] = useState(null);

  useEffect(()=>{
    const stoken = localStorage.getItem("stoken");
    jwt.verify(stoken,process.env.NEXT_PUBLIC_JWT_SECRET,(err)=>{
      if (err) {
        setSellerLogin(false);
      }else{
        setSellerLogin(true);
      }
    })
  },[router.query]);
  
  useEffect(()=>{
    const paths = router.pathname.split("/");
    if (paths.includes("seller")) {
      setIsSeller(true);
    }else{
      setIsSeller(false);
    }
  },[router.query]);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        setSubTotal(JSON.parse(localStorage.getItem("subt")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const isCart = localStorage.getItem("cart");
    if(!isCart){
      setCart({});
    }
    if (token) {
      setKey(Math.random())
    }
  },[router.query])

  const addToCart = (itemCode, qty, price, name, size, variant,img) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      myCart[itemCode] = { qty: 1, price, name, size, variant,img };
    }
    setCart(myCart);
    saveCart(myCart);
    setCharges(60);
  };

  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);

    saveCart(newCart);
  };


  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(cart);
    

    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    localStorage.setItem("subt",subt);
    setSubTotal(subt);
  };

  const logout = ()=>{
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      localStorage.getItem("user")?localStorage.removeItem("user"):null;
      setKey(Math.random())
      router.push("/");
    }
    if(localStorage.getItem("stoken")){
      localStorage.removeItem("stoken");
      setKey(Math.random())
      router.push("/seller/login");
    }
  }
  
  return (
    <>
      {(sellerLogin && isSeller) && <Sidebar key={key} logout={logout}/> }
      {!isSeller && <Navbar isSeller={isSeller} logout={logout} key={key} cart={cart} />}
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
        charges={charges}
        {...pageProps}
      />
      {!isSeller && <Footer />}
    </>
  );
}
