// console.time('Startup');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./middlewares');
const v1 = require('./routes/v1');
const objection = require('./utils/objection');// eslint-disable-line no-unused-vars

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For logging purpose
app.use(morgan('dev'));

// Extra protection
app.use(helmet());

// Swagger Interface
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/v1', v1);

// Extra protection to prevent confusion
app.use('/api', (req, res) => res.send({ error: 'no_route_found' }));

// Error handler middleware
app.use(errorHandler);

// Serv static files
// app.use(express.static('./../client/dist/'));

// Send all other requests to client
// app.use((req, res) => res.sendFile(path.join(__dirname, './../client/dist/', 'index.html')));

http
  .createServer(app)
  .listen(80);

console.log('=================== Service Started ======================');// eslint-disable-line no-console
console.log('You can test services by http://localhost:8080/api/v1/docs');// eslint-disable-line no-console
// console.timeEnd('Startup');
