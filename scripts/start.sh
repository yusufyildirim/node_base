#!/bin/bash

# Script runs at root folder, paths must start from root directory
ROOT=/usr/src/app
API_PATH=$ROOT/packages/api/
CLIENT_PATH=$ROOT/packages/client/

# Does NPM installations and packaging
#lerna bootstrap

#### CLIENT COMMANDS ####
#cd $CLIENT_PATH

#### API COMMANDS ####
cd $API_PATH
npm install

# Start the api
npm start