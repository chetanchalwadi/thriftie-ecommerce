import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import Seller from "@/models/Seller";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { title, desc, img, category, sizes, color, price, avlQty, userId } =
      req.body;
    const newProducts = [];
    sizes.map(async (size) => {
      const slug = `${title}-${size}-${color}`;
      const newProd = new Product({
        title,
        slug: slug,
        desc,
        img,
        category,
        size,
        color,
        price,
        availableQty: avlQty,
        seller: userId,
      });
      newProducts.push(newProd);
      await newProd.save();
    });
    await Seller.findByIdAndUpdate(userId, {
      $push: { products: newProducts },
    });
    res.status(201).json({ message: "New Product added Succesfully" });
  } else {
    res.status(400).json({ message: "This Method is not allowed" });
  }
};

export default connectDb(handler);
