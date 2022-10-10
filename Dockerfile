FROM node:18-buster-slim

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install curl -y && apt-get clean -y && apt-get remove -y

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
