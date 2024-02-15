FROM node:14

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY index.js ./index.js
COPY .env ./.env
COPY controllers ./controllers
COPY routes ./routes

EXPOSE 3000

CMD ["npm", "start"]
