import mongoose, { Schema } from "mongoose";

const forgotSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        token:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
);

mongoose.models = {};

export default mongoose.model("forgotToken",forgotSchema);