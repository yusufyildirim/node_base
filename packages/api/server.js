import express from 'express';
import bodyParser from 'body-parser';
// import path from 'path';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import objection from './utils/objection';
import v1 from './routes/v1';
import { errorHandler } from './middlewares';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For logging purpose
app.use(morgan('dev'));

// Extra protection
app.use(helmet());

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

console.log('You can test services by http://localhost:8080/api/v1/example');// eslint-disable-line no-console
