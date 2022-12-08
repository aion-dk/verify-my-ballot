# syntax=docker/dockerfile:1
FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/nodejs:18-dev-latest as development

WORKDIR /usr/src/app

COPY --link package.json yarn.lock ./

RUN apt-get update -y && apt-get install curl -y --no-install-recommends

RUN yarn install && yarn cache clean

COPY . .

CMD ["yarn", "start"]

FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/nodejs:18-latest as production

WORKDIR /usr/src/app

COPY --link --from=development /usr/src/app/package.json /usr/src/app/yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

COPY --from=development /usr/src/app/ ./

RUN yarn build

CMD ["yarn", "start"]
