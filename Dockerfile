# base image
FROM node:11.4.0-slim

WORKDIR /usr/src/app

# install global dependencies
RUN npm install pm2 -g