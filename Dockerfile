# base image
FROM node:10.5.0-slim

WORKDIR /usr/src/app

# install global dependencies
RUN npm install pm2 -g
RUN npm install lerna -g