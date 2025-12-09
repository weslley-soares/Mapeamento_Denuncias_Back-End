FROM node:20-alpine

# Diretório da app
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala deps
RUN npm install --omit=dev

# Copia o resto do código
COPY . .

# Porta que o servidor usa (ajuste se necessário)
EXPOSE 8080

# Comando de start (ajuste conforme seu package.json)
CMD ["npm", "start"]