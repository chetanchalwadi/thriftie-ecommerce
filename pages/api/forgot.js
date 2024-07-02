import ForgotPasswordToken from "@/models/ForgotPasswordToken";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDb from "@/middleware/mongoose";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const handler = async (req, res) => {
  var rand = function () {
    return Math.random().toString(36).substr(2);
  };

  var genToken = function () {
    return rand() + rand();
  };

  if (req.method == "POST") {
    if (req.body.sendMail) {
      const token = genToken();
      const forgot = new ForgotPasswordToken({
        email: req.body.email,
        token: token,
      });
      await forgot.save();

      let config = {
        service: "gmail",
        auth:{
          user: process.env.MAILUSER,
          pass: process.env.MAILPASS,
        }
        
      };
      const transporter = nodemailer.createTransport(config);

      let mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "MailGen",
          link: "https://mailgen.js/",
        },
      });

      var response = {
        body: {
          name: "Thriftie",
          intro: "Here is your requested link for change of password.",
          action: {
            instructions: "Please click below link to change your password!",
            button: {
              color: "#FFA500",
              text: "Change Pasword",
              link: `${process.env.NEXT_PUBLIC_HOST}/forgotPassword?token=${token}`,
            },
          },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      };

      let mail = await mailGenerator.generate(response);

      let message = {
        from: process.env.MAILUSER,
        to: req.body.email,
        subject: "Request for Password Change!",
        html: mail,
      };

      transporter
        .sendMail(message)
        .then((x) => {
          return res
            .status(200)
            .json({ success: true, message: "Email Sent Successfully!" });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(404)
            .json({ success: false, message: "Error sending mail" });
        });
        
    } else {
      const user = await ForgotPasswordToken.findOne({ token: req.body.token });
      if (user) {
        const { password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const userPresent = await User.findOne({ email: user.email });
        if (userPresent) {
          const foundUser = await User.findOneAndUpdate(
            { email: user.email },
            { password: hashedPass }
          );
          await foundUser.save();
          await ForgotPasswordToken.findOneAndDelete({ token: req.body.token });
          return res
            .status(200)
            .json({ success: true, message: "Password Updated Successfully" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "User Doesn't Exists" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "UnAuthorized Token" });
      }
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "UnAutorized Method" });
  }
};

export default connectDb(handler);
