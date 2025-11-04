import { Router } from "express";
import { login, loginValidation } from "../controllers/usuarios/Login";
import { register, registerValidation } from "../controllers/usuarios/Register";

export const usuariosRoutes = Router();

usuariosRoutes.post("/login", loginValidation, login);
usuariosRoutes.post("/register", registerValidation, register);