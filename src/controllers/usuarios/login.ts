import { RequestHandler } from "express";
import * as yup from "yup";
import { db } from "../../config/database";
import bcrypt from "bcrypt";
import { jwtService } from "../../services/jwtService";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../middlewares/validation";

export const loginValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      email: yup.string().email().required(),
      senha: yup.string().required(),
    })
  ),
}));

export const login: RequestHandler = async (req, res) => {
  const { email, senha } = req.body;

  const user = await db("usuarios").where({ email }).first();
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Usuário não encontrado." });
  }

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Senha incorreta." });
  }

  const token = jwtService.sign({ id: user.id, email: user.email, cargo: user.cargo });
  return res.status(StatusCodes.OK).json({ token });
};