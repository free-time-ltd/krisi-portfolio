import { NextApiResponse, NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Invalid request method" });
  }

  return res.status(200).json({
    success: true,
    data: {
      url: "http://localhost/signed/url...",
      expiresAt: 86000,
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
