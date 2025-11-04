import http from "http";
import { app } from "./app";
import { initSockets } from "./sockets";

const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

// Inicializa sockets e exporta instância internamente
initSockets(server);

server.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});