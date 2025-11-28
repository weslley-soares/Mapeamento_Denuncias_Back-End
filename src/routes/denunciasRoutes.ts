import { Router } from "express";
import { create, createDenunciaValidation } from "../controllers/denuncias/Create";
import { getAll } from "../controllers/denuncias/GetAll";
import { getByProtocolo } from "../controllers/denuncias/GetByProtocolo";
import { updateStatus, updateStatusValidation } from "../controllers/denuncias/UpdateStatus";
import { ensureAuth } from "../middlewares/ensureAuth";
import { updateLocalizacao } from '../controllers/denuncias/updateLocalizacao';

export const denunciasRoutes = Router();

denunciasRoutes.patch("/:id/location", ensureAuth, updateLocalizacao);

// Rota pública (consulta)
denunciasRoutes.get("/:protocolo", getByProtocolo);

// Rotas privadas (funcionários)
denunciasRoutes.get("/", ensureAuth, getAll);
denunciasRoutes.post("/", ensureAuth, createDenunciaValidation, create);
denunciasRoutes.patch("/:id/status", ensureAuth, updateStatusValidation, updateStatus);