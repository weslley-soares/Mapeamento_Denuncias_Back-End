import { RequestHandler } from "express";
import { db } from "../../config/database";
import { StatusCodes } from "http-status-codes";

export const getAll: RequestHandler = async (req, res) => {
  const denuncias = await db("denuncias").select("*");
  return res.status(StatusCodes.OK).json(denuncias);
};

export const getPublicAll: RequestHandler = async (req, res) => {
  const denuncias = await db("denuncias").select("id", "titulo", "latitude", "longitude", "status");
  return res.status(StatusCodes.OK).json(denuncias);
};