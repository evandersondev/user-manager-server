FROM node:18-alpine

WORKDIR /home/node/app

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]