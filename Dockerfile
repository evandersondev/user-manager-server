FROM node:18-slim

WORKDIR /home/node/app

RUN npm i -g pnpm

COPY . .

USER node

CMD [ "pnpm", "start:dev" ]