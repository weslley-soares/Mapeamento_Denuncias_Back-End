import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { usuariosRoutes } from './routes/usuariosRoutes';
import { denunciasRoutes } from './routes/denunciasRoutes';

export const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use('/usuarios', usuariosRoutes);
app.use('/denuncias', denunciasRoutes);