import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import { AddressInfo } from "net";

let io: IOServer | null = null;

export const initSockets = (server: HTTPServer) => {
  io = new IOServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    // Exemplo: cliente pode juntar-se a sala "public" ou "admin"
    socket.on("joinRoom", (room: string) => {
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  const address = server.address() as AddressInfo | null;
  if (address) console.log(`Socket.IO pronto em ${address.port}`);
};

export const emitNewDenuncia = (payload: object) => {
  if (!io) return;
  // Emite para todos conectados — se quiser segmentar, use salas
  io.emit("denuncia:new", payload);
};

export const emitUpdateDenuncia = (payload: object) => {
  if (!io) return;
  io.emit("denuncia:update", payload);
};