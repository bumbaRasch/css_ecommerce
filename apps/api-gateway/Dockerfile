FROM node:23-slim

RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

COPY apps/api-gateway ./apps/api-gateway
COPY libs ./libs

RUN npm install

RUN npm run build api-gateway

EXPOSE 3000

CMD ["node", "dist/apps/api-gateway/main.js"]
