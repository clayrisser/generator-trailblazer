#############################################
# Dockerfile to run trailblazer
# Based on Alpine
#############################################

FROM node:7.8-alpine

MAINTAINER Jam Risser (jamrizzi)

ENV MONGO_HOST=db
ENV MONGO_PORT=27017
ENV MONGO_DATABASE=trails
ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /app/

RUN apk add --no-cache \
        tini && \
    apk add --no-cache --virtual build-deps \
        git && \
    npm install -g eslint

COPY ./package.json /app/
RUN npm install
COPY ./ /app/
RUN npm test && \
    apk del build-deps && \
    npm uninstall -g eslint && \
    npm prune --production

ENTRYPOINT ["/sbin/tini", "--", "node", "/app/node_modules/babel-cli/bin/babel-node", "/app/server.js"]
