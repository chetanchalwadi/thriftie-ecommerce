import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'PUT') {
        const {_id,product} = req.body;
        const updatedProd = await Product.findByIdAndUpdate(_id,product);
        await updatedProd.save();
        res.status(201).json({message:"Product updated Succesfully",product:updatedProd});
    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }

}

export default connectDb(handler);
  