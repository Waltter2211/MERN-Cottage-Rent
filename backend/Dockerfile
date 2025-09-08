FROM node:lts-alpine

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "node", "index.js" ]