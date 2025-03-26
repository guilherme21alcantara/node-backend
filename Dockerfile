# Usando Node.js como base
FROM node:14

# Diretorio definido
WORKDIR /usr/src/app

COPY package*.json ./

# Instalacao de todas as dependencias
RUN npm install

COPY . .

# Expondo a porta para rodar
EXPOSE 3000

# Definindo comando para rodar
CMD ["npm", "start"]
