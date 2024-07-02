import mongoose, { Schema } from "mongoose";

const OrderedProductSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    product: {
      type: Object,
      require:true
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    status:{
        type:String,
        default:"Pending"
    }
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("orderedProduct", OrderedProductSchema);
