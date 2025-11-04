import { Router } from "express";
import { usuariosRoutes } from "./usuariosRoutes";
import { denunciasRoutes } from "./denunciasRoutes";

export const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/denuncias", denunciasRoutes);