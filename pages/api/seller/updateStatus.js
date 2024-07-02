import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import OrderedProduct from "@/models/OrderedProduct";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { status, oid , opid } = req.body;
    try {
        await Order.findOneAndUpdate({order_id: oid },{status: status});
        await OrderedProduct.findByIdAndUpdate(opid,{status:status});
        res.status(201).json({ message: "Order updated Succesfully" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
