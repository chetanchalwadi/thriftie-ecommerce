import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    order_id:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    paymentInfo:{
      type:String
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    products: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("order", orderSchema);
