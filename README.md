# node_base
Node / Express / Docker API Boilerplate

# Steps:
## To Start:
* git clone
* Go to main directory
* npm install

## API Side:
* docker-compose up
* http://localhost:8080/api/v1/example to test the api
* http://localhost:8080/api/v1/docs/ to swagger interface
* Database: Postgres. Use localhost:5433 to connect to the database from your local.

## Client Side:
* Go to packages/client directory
* npm install
* npm start
* http://localhost:1234 to test

## Docker commands:
### List Docker:
docker ps

### Connect Docker:
docker exec -it CONTAINER_ID /bin/bash 
