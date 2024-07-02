import Seller from "@/models/Seller";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    const errors = { usernameError: String, passwordError: String };
    try {
      const existingSeller = await Seller.findOne({ email });
      if (!existingSeller) {
        errors.usernameError = "Seller Not Found!";
        return res.status(404).json(errors);
      }
      const isPassCorrect = await bcrypt.compare(
        password,
        existingSeller.password
      );
      if (!isPassCorrect) {
        errors.passwordError = "Invalid Credentials";
        return res.status(400).json(errors);
      }
      const token = jwt.sign(
        {
          email,
          id: existingSeller._id,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: existingSeller, sellertoken: token });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
