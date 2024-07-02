import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
import { IncomingForm } from "formidable";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ error: "Error parsing form data." });
          return;
        }

        const { file } = files;
        
        const result = await cloudinaryV2.uploader.upload(file[0].filepath);
        res.status(200).json({ public_id: result.public_id, secure_url: result.secure_url });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error while uploading image." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
