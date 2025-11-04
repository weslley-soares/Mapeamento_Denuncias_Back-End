import { RequestHandler } from "express";
import * as yup from "yup";
import { db } from "../../config/database";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../middlewares/validation";

export const registerValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().min(6).required(),
      cargo: yup.string().required(),
    })
  ),
}));

export const register: RequestHandler = async (req, res) => {
  const { nome, email, senha, cargo } = req.body;

  const exists = await db("usuarios").where({ email }).first();
  if (exists) {
    return res.status(StatusCodes.CONFLICT).json({ message: "Email já cadastrado." });
  }

  const hashed = await bcrypt.hash(senha, 10);

  await db("usuarios").insert({ nome, email, senha: hashed, cargo });

  return res.status(StatusCodes.CREATED).json({ message: "Usuário criado com sucesso." });
};