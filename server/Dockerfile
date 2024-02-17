FROM node:14

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY index.js ./index.js
COPY src/ ./src

EXPOSE 3000

CMD ["npm", "start"]
