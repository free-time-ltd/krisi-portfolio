import { NextApiResponse, NextApiRequest } from "next";
import { findHash } from "@portfolio/db/models/uploadStatus.model";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hash } = req.query;

  const dbRes = await findHash(hash as string);

  if (!dbRes) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found." });
  }

  return res.status(200).json({ success: true, data: dbRes });
}
