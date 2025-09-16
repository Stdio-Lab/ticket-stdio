FROM node:20

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Exponemos el puerto de Expo Web
EXPOSE 19000

# Comando por defecto para desarrollo web
CMD ["npx", "expo", "start", "--web", "--host", "0.0.0.0"]

# PARA SUBIR TODAS LAS POSIBLES VERSIONES YA SEA MOBIL, DEVTOOLS, ETC...
# FROM node:20

# # Instala watchman para React Native
# RUN apt-get update && apt-get install -y watchman && rm -rf /var/lib/apt/lists/*

# WORKDIR /app

# # Copia package.json y package-lock.json
# COPY package*.json ./

# # Instala dependencias
# RUN npm install

# # Copia todo el proyecto
# COPY . .

# # Exponemos los puertos de Expo y Metro Bundler
# EXPOSE 19000 19001 19002 8081

# # Comando por defecto para desarrollo con Expo
# CMD ["npx", "expo", "start", "--tunnel"]

