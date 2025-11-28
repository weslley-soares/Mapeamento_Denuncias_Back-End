export interface IDenuncia {
  id?: number;
  titulo: string;
  descricao: string;
  bairro: string;
  endereco: string;
  latitude: number;
  longitude: number;
  status?: string;
  protocolo: string;
  created_at?: Date;
  updated_at?: Date;
}