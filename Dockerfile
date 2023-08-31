FROM node:18-alpine

WORKDIR /home/api

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD [ "pnpm", "start:dev" ]