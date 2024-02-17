FROM node:16 as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY src/ ./src/
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
RUN npm install
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]