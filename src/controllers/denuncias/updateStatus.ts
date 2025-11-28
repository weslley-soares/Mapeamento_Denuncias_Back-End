import { RequestHandler } from "express";
import * as yup from "yup";
import { db } from "../../config/database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../middlewares/validation";

export const updateStatusValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      status: yup.string().oneOf(["em andamento", "concluído", "concluído", "Arquivado"]).required(),
    })
  ),
}));

export const updateStatus: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const exists = await db("denuncias").where({ id }).first();
  if (!exists) return res.status(StatusCodes.NOT_FOUND).json({ message: "Denúncia não encontrada" });

  await db("denuncias").where({ id }).update({ status });
  return res.status(StatusCodes.OK).json({ message: "Status atualizado com sucesso" });
};