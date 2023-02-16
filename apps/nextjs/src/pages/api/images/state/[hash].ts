import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "~/server/db";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hash } = req.query;

  const dbRes = await prisma.uploadStatus.findUnique({
    where: {
      hash: hash as string,
    },
  });

  if (!dbRes) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found." });
  }

  return res.status(200).json({ success: true, data: dbRes });
}
