FROM node:19.2-alpine

RUN mkdir -p /src
COPY package.json src/package.json
WORKDIR /src

RUN npm install

COPY . /src

RUN npm run build

EXPOSE 80:4000

CMD npm start
