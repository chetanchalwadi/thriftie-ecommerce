import connectDb from "@/middleware/mongoose";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const email = req.body.email;
    if (email) {
      const foundUser = await User.find({ email: email });
      res.status(200).json({ user: foundUser });
    } else {
      res.status(401).json({ message: "You are not Authorized!" });
    }
  }
};

export default connectDb(handler);
