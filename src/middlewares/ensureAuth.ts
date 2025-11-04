import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const ensureAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = decoded;
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token inválido" });
  }
};