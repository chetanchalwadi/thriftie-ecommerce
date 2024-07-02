import Seller from "@/models/Seller";
import connectDb from "@/middleware/mongoose";
import bcrypt from "bcrypt";


const handler = async (req, res) => {
    if (req.method == 'POST') {
        try{
            const {name,email,password,contactNumber} = req.body;
            const errors = {emailError:String};
            const existingSellermail = await Seller.findOne({email});
            const existingSellernum = await Seller.findOne({contactNumber});
            if(existingSellermail || existingSellernum){
                errors.emailError = "Seller Account already exists";
                return res.status(400).json(errors);
            }
            const sellers = await Seller.find({});
    
            let helper;
            if(sellers.length < 10){
                helper = "00"+sellers.length.toString();
            }else if(sellers.length<100 && sellers.length>9){
                helper = "0"+sellers.length.toString();
            }else{
                helper = sellers.length.toString();
            }
            const date = new Date();
            const selComps = ["SEL",date.getFullYear(),helper];
            const username = selComps.join("");
            const hashedPass = await bcrypt.hash(password,10);
            const newSeller = await new Seller({
                name,
                username,
                email,
                password:hashedPass,
                contactNumber
            });
            await newSeller.save();
            return res.status(201).json({
                success:true,
                message:"Seller Created Succefully",
                response: newSeller
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
  