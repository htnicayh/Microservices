FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4002

CMD [ "yarn", "dev" ]