import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
        },
        email:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true
        },
        username:{
            type: String
        },
        contactNumber:{
            type:String
        },
        dob:{
            type:String
        },
        avatar:{
            type:String
        },
        address:{
            type:String
        },
        pincode:{
            type:String
        },
        orders:[
            {
                type:Schema.Types.ObjectId,
                ref:"Order"
            }
        ]
    },{
        timestamps:true
    }
);

mongoose.models = {};

export default mongoose.model("user",userSchema);