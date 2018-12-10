# base image
FROM node:10.5.0-slim

VOLUME /usr/src/app/
VOLUME /usr/src/app/packages/api/node_modules/

WORKDIR /usr/src/app

# install global dependencies
RUN npm install pm2 -g

EXPOSE 80