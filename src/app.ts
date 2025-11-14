import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { usuariosRoutes } from './routes/usuariosRoutes';
import { denunciasRoutes } from './routes/denunciasRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/denuncias', denunciasRoutes);