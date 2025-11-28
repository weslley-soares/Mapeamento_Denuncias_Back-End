import { RequestHandler } from "express";
import * as yup from "yup";
import { db } from "../../config/database";
import { generateProtocolo } from "../../utils/generateProtocolo";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../middlewares/validation";
import { emitNewDenuncia } from "../../sockets";

export const createDenunciaValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      titulo: yup.string().required(),
      descricao: yup.string().required(),
      bairro: yup.string().required(),
      endereco: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    })
  ),
}));

export const create: RequestHandler = async (req, res) => {
  const { titulo, descricao, bairro, tipo, endereco, latitude, longitude } = req.body;
  const protocolo = generateProtocolo();

  const [id] = await db("denuncias").insert({
    titulo,
    descricao,
    bairro,
    tipo,
    endereco,
    latitude,
    longitude,
    protocolo,
  });

  const inserted = await db("denuncias").where({ id }).first();

  // Emite APENAS os dados públicos para o mapa
  emitNewDenuncia({
    id: inserted.id,
    titulo: inserted.titulo,
    latitude: Number(inserted.latitude),
    longitude: Number(inserted.longitude),
    status: inserted.status,
  });

  return res.status(StatusCodes.CREATED).json({ id, protocolo });
};