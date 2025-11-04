import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "segredo123";

export const jwtService = {
  sign: (payload: object) => jwt.sign(payload, secret, { expiresIn: "1d" }),
  verify: (token: string) => jwt.verify(token, secret),
};