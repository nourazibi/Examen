# Utiliser l'image officielle Node.js
FROM node:16

# Créer un répertoire pour l'application
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
