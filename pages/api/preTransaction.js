import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import pincodes from "../../sampleData/pincodes.json";
import Seller from "@/models/Seller";
import OrderedProduct from "@/models/OrderedProduct";

const handler = async (req, res) => {
  if (req.method == "POST") {
    //Check if cart is tampered
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(202).json({
        message: "The Pincode is not Serviceable!",
      });
      return;
    }
    let product,
      sumTotal = 0;
    for (let item in req.body.cart) {
      sumTotal += req.body.cart[item].price * req.body.cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.availableQty < req.body.cart[item].qty) {
        let msg;
        if (product.availableQty == 0) {
          msg = `${product.slug} Out Of stock!`;
        } else {
          msg = `Sorry, Only ${product.availableQty} ${product.slug} ${product.category} instock.`;
        }
        res.status(202).json({
          message: msg,
        });
        return;
      }
      if (product.price != req.body.cart[item].price) {
        res
          .status(401)
          .json({ error: "Product prices have been updated!Please Redo." });
        return;
      }
    }
    if (sumTotal != req.body.amount) {
      res
        .status(401)
        .json({ error: "Product prices have been updated!Please Redo." });
      return;
    }
    const newOrder = new Order({
      email: req.body.email,
      order_id: req.body.oid,
      address: req.body.finalAddress,
      amount: req.body.amount,
      products: req.body.cart,
      userId: req.body.userId,
    });
    await newOrder.save();
    let foundProduct;
    for (let item in req.body.cart) {
      foundProduct = await Product.findOne({ slug: item });
      const newOrderedP = new OrderedProduct({
        order_id: req.body.oid,
        product: foundProduct,
        email: req.body.email,
        address: req.body.finalAddress,
        qty: req.body.cart[item].qty,
        amount: foundProduct.price * req.body.cart[item].qty,
      });
      await newOrderedP.save();
      await Seller.findByIdAndUpdate(foundProduct.seller, {
        $push: { orders: newOrderedP },
      });

      const filter = { slug: item };
      const updates = {
        availableQty: foundProduct.availableQty - req.body.cart[item].qty,
      };
      const updateProduct = await Product.findOneAndUpdate(filter, updates);
      updateProduct.save();
    }
    res
      .status(201)
      .json({ Message: "Order Successfully Placed", order: newOrder });
  } else {
    res.status(400).json({ Message: "This method Not allowed" });
  }
};

export default connectDb(handler);
