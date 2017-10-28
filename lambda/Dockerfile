FROM node:6.10-alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN yarn

ENTRYPOINT ["yarn", "simulate"]
