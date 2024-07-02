import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import Seller from "@/models/Seller";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const seller = await Seller.findById(req.body.sellerId);
    if (seller) {
      let prods = [];
      for (let i = 0; i < seller.products.length; i++) {
        const element = seller.products[i];
        const p = await Product.findById(element);
        if (p) {
          prods.push(p);
        }
      }
      res
        .status(200)
        .json({ message: "Products Fetched Successfully", products: prods });
    } else {
      res.status(400).json({ message: "Seller Not Found" });
    }
  } else {
    res.status(400).json({ message: "This Method is not allowed" });
  }
};

export default connectDb(handler);
