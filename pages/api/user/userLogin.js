import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    const errors = { usernameError: String, passwordError: String };
    try {
      const existinguser = await User.findOne({ email });
      if (!existinguser) {
        errors.usernameError = "user Not Found!";
        return res.status(404).json(errors);
      }
      const isPassCorrect = await bcrypt.compare(
        password,
        existinguser.password
      );
      if (!isPassCorrect) {
        errors.passwordError = "Invalid Credentials";
        return res.status(400).json(errors);
      }
      const token = jwt.sign(
        {
          email,
          id: existinguser._id,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: "1h" }
      );
      const user = {
        name: existinguser.name,
        email: existinguser.email,
        contactNumber: existinguser.contactNumber,
        dob: existinguser.dob,
        avatar: existinguser.avatar,
      };
      res.status(200).json({ user: user, usertoken: token });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
