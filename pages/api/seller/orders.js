import connectDb from "@/middleware/mongoose";
import OrderedProduct from "@/models/OrderedProduct";
import Product from "@/models/Product";
import Seller from "@/models/Seller";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const seller = await Seller.findById(req.body.sellerId);
    if (seller) {
      const finalOrders = [];
      for(let i=0;i<seller.orders.length;i++){
        const element = seller.orders[i];
        const ordElement = await OrderedProduct.findById(element);
        const p = await Product.findById(ordElement.product);
        const order = {ordElement,p};
        if(ordElement){
            finalOrders.push(order);
        }
      }
      res
        .status(200)
        .json({ message: "orders Fetched Successfully", orders: finalOrders });
    } else {
      res.status(400).json({ message: "Seller Not Found" });
    }
  } else {
    res.status(400).json({ message: "This Method is not allowed" });
  }
};

export default connectDb(handler);
