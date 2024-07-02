import User from "@/models/User";
import Connectdb from "@/middleware/mongoose";
const bcrypt = require("bcrypt");

const updatePassword = async (email, password, npassword) => {
  let target = await User.findOne({ email });
  if (!target) {
    throw "Internal Server Error.";
  }
  let user = {};
  const match = await bcrypt.compare(password, target.password);
  if (match) {
    let saltRounds = 10;
    let encryptedpass = await bcrypt.hash(npassword, saltRounds);
    user = await User.findOneAndUpdate(
      { email },
      {
        password: encryptedpass,
      }
    );
  } else {
    throw "Invalid Credentials.";
  }
  return user;
};

const updateDetails = async (email, name, pincode, phone, address) => {
  let obj = {};
  if (name) {
    obj["name"] = name;
  }
  if (pincode) {
    obj["pincode"] = pincode;
  }
  if (phone) {
    obj["phone"] = phone;
  }
  if (address) {
    obj["address"] = address;
  }
  let user = await User.findOneAndUpdate({ email }, obj);
  if (!user) {
    throw "Invalid User";
  }
  return user;
};

const UpdateUser = async (req, res) => {
  if (req.method == "POST") {
    if (
      req.body.data.npassword &&
      req.body.data.cpassword &&
      req.body.data.password
    ) {
      if (req.body.data.npassword == req.body.data.cpassword) {
        try {
          let x = await updatePassword(
            req.body.data.email,
            req.body.data.password,
            req.body.data.npassword
          );
          if (
            req.body.data.name ||
            req.body.data.pincode ||
            req.body.data.phone ||
            req.body.data.address
          ) {
            let { name, pincode, phone, address, email } = req.body.data;
            try {
              let x = await updateDetails(email, name, pincode, phone, address);
              return res.status(200).json({ fulfilled: "both" });
            } catch (error) {
              return res.status(200).json({ fulfilled: "pass", error: error });
            }
          }

          return res.status(200).json({ fulfilled: "onlypass" });
        } catch (error) {
          if (
            req.body.data.name ||
            req.body.data.pincode ||
            req.body.data.phone ||
            req.body.data.address
          ) {
            let { name, pincode, phone, address, email } = req.body.data;
            try {
              let x = await updateDetails(email, name, pincode, phone, address);
              return res.status(200).json({ fulfilled: "details" });
            } catch (error) {
              return res.status(200).json({ fulfilled: "none", error: error });
            }
          }
          return res.status(200).json({ fulfilled: "nopass", error: error });
        }
      } else {
        return res
          .status(200)
          .json({
            success: false,
            fulfilled: "not",
            error: "Passwords do not match",
          });
      }
    }
    if (
      req.body.data.name ||
      req.body.data.pincode ||
      req.body.data.phone ||
      req.body.data.address
    ) {
      let { name, pincode, phone, address, email } = req.body.data;
      try {
        let x = await updateDetails(email, name, pincode, phone, address);
        return res.status(200).json({ fulfilled: "onlydetail" });
      } catch (error) {
        return res.status(200).json({ fulfilled: "nodetail", error: error });
      }
    }
    return res
      .status(200)
      .json({ error: "Please, Enter all requisite values." });
  } else {
    res.status(400).json({ error: "method not allowed" });
  }
};
export default Connectdb(UpdateUser);
