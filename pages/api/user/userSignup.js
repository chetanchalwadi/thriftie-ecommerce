import connectDb from "@/middleware/mongoose";
import bcrypt from "bcrypt";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try{
            const {name,email,password,contactNumber} = req.body;
            const errors = {emailError:String};
            const existingusermail = await User.findOne({email});
            const existingusernum = await User.findOne({contactNumber});
            if(existingusermail || existingusernum){
                errors.emailError = "user Account already exists";
                return res.status(400).json(errors);
            }
            const users = await User.find({});
    
            let helper;
            if(users.length < 10){
                helper = "00"+users.length.toString();
            }else if(users.length<100 && users.length>9){
                helper = "0"+users.length.toString();
            }else{
                helper = users.length.toString();
            }
            const date = new Date();
            const userComps = ["TF",date.getFullYear(),helper];
            const username = userComps.join("");
            const verified = false;
            const hashedPass = await bcrypt.hash(password,10);
            const newuser = await new User({
                name,
                username,
                email,
                password:hashedPass,
                contactNumber,
                verified
            });
            await newuser.save();
            const token = jwt.sign({
                email,
                id:newuser.email
            },process.env.NEXT_PUBLIC_JWT_SECRET,{expiresIn:"1h"});
            return res.status(201).json({
                success:true,
                message:"user Created Succefully",
                response: newuser,
                usertoken:token
            });
        }catch(error){
            const errors = {backendError:String};
            errors.backendError = error;
            res.status(500).json(errors);
        }
    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }

}

export default connectDb(handler);
  