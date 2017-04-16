#############################################
# Dockerfile to run Oauth Trails
# Based on Alpine
#############################################

FROM node:7.8-alpine

MAINTAINER Jam Risser (jamrizzi)

ENV MONGO_HOST=db
ENV MONGO_PORT=27017
ENV MONGO_DATABASE=trails
ENV NODE_ENV=production

EXPOSE 8888

WORKDIR /app/

RUN apk add --no-cache tini && \
    apk add --no-cache --virtual build-dependencies git && \
    npm install -g eslint

COPY ./package.json /app/
RUN npm install --only=dev && npm install
COPY ./ /app/
RUN npm test && \
    apk del build-dependencies && \
    npm uninstall -g eslint && \
    npm prune --production

ENTRYPOINT ["/sbin/tini", "--", "node", "/app/server.js"]
