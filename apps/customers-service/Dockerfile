FROM node:23-slim

RUN apt-get update && apt-get install -y \
  openssl \
  libssl-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

COPY apps/customers-service ./apps/customers-service
COPY libs ./libs

RUN npm install

RUN npx prisma generate --schema=./apps/customers-service/prisma/schema.prisma

RUN npm run build customers-service

CMD ["node", "dist/apps/customers-service/main.js"]
