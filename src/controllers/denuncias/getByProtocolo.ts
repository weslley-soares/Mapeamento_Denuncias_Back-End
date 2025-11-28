import { RequestHandler } from "express";
import { db } from "../../config/database";
import { StatusCodes } from "http-status-codes";

export const getByProtocolo: RequestHandler = async (req, res) => {
  const { protocolo } = req.params;
  const denuncia = await db("denuncias").where({ protocolo }).first();

  if (!denuncia) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Protocolo não encontrado." });
  }

  // Retorna apenas informações públicas
  return res.status(StatusCodes.OK).json({
    titulo: denuncia.titulo,
    bairro: denuncia.bairro,
    descricao: denuncia.descricao,
    endereco: denuncia.endereco,
    latitude: denuncia.latitude,
    longitude: denuncia.longitude,
    status: denuncia.status,
  });
};