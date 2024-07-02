import pincodes from "../../sampleData/pincodes.json";

export default function handler(req, res) {
    res.status(200).json({pincodes:pincodes});
}
  