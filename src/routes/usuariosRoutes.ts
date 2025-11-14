import { Router } from "express";
import { login, loginValidation } from "../controllers/usuarios/login";
import { register, registerValidation } from "../controllers/usuarios/register";

export const usuariosRoutes = Router();

usuariosRoutes.post("/login", loginValidation, login);
usuariosRoutes.post("/register", registerValidation, register);