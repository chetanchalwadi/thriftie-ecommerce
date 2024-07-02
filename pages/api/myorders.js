import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  const id = req.body.id;
  if (id) {
    let Orders = await Order.find({ userId: id });
    res.status(200).json({ orders: Orders });
  } else {
    res.status(401).json({ message: "You are not Authorized!" });
  }
};

export default connectDb(handler);
