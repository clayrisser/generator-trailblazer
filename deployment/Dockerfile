#############################################
# Dockerfile to run Trails IMO
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
    apk add --no-cache --virtual build-dependencies git

COPY ./package.json /app/
RUN npm install
COPY ./ /app/
RUN apk del build-dependencies

ENTRYPOINT ["/sbin/tini", "--", "node", "/app/server.js"]
