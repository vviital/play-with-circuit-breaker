FROM node:latest

WORKDIR /home/app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN npm install -g yarn
RUN yarn install

COPY common.js common.js
COPY runner runner
COPY assets assets
COPY users users
COPY facade facade

CMD [ "yarn", "start"]
