import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
    let Products = await Product.find({});
    res.status(200).json({ products: Products });
};

export default connectDb(handler);
