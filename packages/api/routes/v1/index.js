const express = require('express');
const { auth } = require('../../middlewares');
const ExampleRoute = require('./ExampleRoute');
const AuthRoute = require('./AuthRoute');

const router = express.Router();

// Auth not required
router.use('/example', ExampleRoute);
router.use('/auth', AuthRoute);

// Auth required
router.use(auth.isAuthenticated);
// router.use('/example', ExampleRoute);

module.exports =  router;
