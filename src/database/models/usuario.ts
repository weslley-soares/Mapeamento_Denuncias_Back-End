export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  created_at?: Date;
  updated_at?: Date;
}