
FROM node:lts-alpine

WORKDIR /src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "node", "dist/main.js" ]