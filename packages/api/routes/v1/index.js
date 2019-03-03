const express = require('express');
const { auth, routeChecker } = require('../../middlewares');
const ExampleRoute = require('./ExampleRoute');
const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');
const TestRoute = require('./TestRoute');

const router = express.Router();

router.use(routeChecker.isExist);

// Auth not required
router.use('/example', ExampleRoute);
router.use('/auth', AuthRoute);
router.use('/test', TestRoute);

// Auth required
router.use(auth.isAuthenticated);
// router.use(auth.isAuthorized);
router.use('/user', UserRoute);


module.exports = router;
