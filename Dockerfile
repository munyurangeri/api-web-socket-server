# Stage 1: Install dependencies
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Stage 2: Run application
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD [ "node", "index.js" ]