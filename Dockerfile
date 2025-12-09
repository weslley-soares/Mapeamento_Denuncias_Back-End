FROM node:20-alpine

WORKDIR /app

# Copia configs de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --omit=dev

# Copia o restante do código
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe a porta (ajuste se sua API usar outra)
EXPOSE 8080

# Sobe a API
CMD ["node", "dist/server.js"]