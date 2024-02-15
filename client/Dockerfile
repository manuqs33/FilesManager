FROM node:16 as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]