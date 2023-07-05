FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV SERVER_PORT=3010

EXPOSE 3010

CMD ["npm", "start"]

