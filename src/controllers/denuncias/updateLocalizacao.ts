import { RequestHandler } from "express";
import { db } from "../../config/database";
import { StatusCodes } from "http-status-codes";
import { emitUpdateDenuncia } from "../../sockets";

export const updateLocalizacao: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude, endereco, bairro, estado } = req.body;

  const denuncia = await db("denuncias").where({ id }).first();
  if (!denuncia) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Denúncia não encontrada",
    });
  }

  await db("denuncias")
    .where({ id })
    .update({
      latitude,
      longitude,
      endereco,
      bairro,
    });

  const updated = await db("denuncias").where({ id }).first();

  emitUpdateDenuncia({
    id: updated.id,
    latitude: Number(updated.latitude),
    longitude: Number(updated.longitude),
    bairro: updated.bairro,
    endereco: updated.endereco,
  });

  return res.status(StatusCodes.OK).json({
    message: "Localização atualizada com sucesso",
    denuncia: updated,
  });
};