import { RequestHandler } from "express";
import { db } from "../../config/database";
import { StatusCodes } from "http-status-codes";

export const getAll: RequestHandler = async (req, res) => {
  try {
    const { titulo, bairro, tipo, status, dataIn, dataFim, limit } = req.query;

    const query = db("denuncias").select("*");

    // filtros opcionais
    if (titulo) query.where("titulo", titulo);
    if (bairro) query.where("bairro", bairro);
    if (tipo) query.where("tipo", tipo);
    if (status) query.where("status", status);

    // filtrar por intervalo de datas
    if (dataIn) query.where("data_criacao", ">=", dataIn);
    if (dataFim) query.where("data_criacao", "<=", dataFim);

    // limite opcional
    if (limit) query.limit(Number(limit));

    const denuncias = await query;

    const formatted = denuncias.map((d) => ({
      ...d,
      data_criacao: d.data_criacao
        ? new Date(d.data_criacao).toLocaleDateString("pt-BR")
        : null,
      data: d.data
        ? new Date(d.data).toLocaleDateString("pt-BR")
        : null,
    }));

    return res.status(StatusCodes.OK).json(formatted);

  } catch (error) {
    console.error("Erro ao buscar denúncias:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao buscar denúncias" });
  }
};