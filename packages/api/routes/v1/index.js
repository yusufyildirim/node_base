import express from 'express';
import { auth } from '../../middlewares';
import ExampleRoute from './ExampleRoute';
import AuthRoute from './AuthRoute';
import TestRoute from './TestRoute';

const router = express.Router();

// Auth not required
router.use('/example', ExampleRoute);
router.use('/auth', AuthRoute);
router.use('/test', TestRoute);

// Auth required
router.use(auth.isAuthenticated);
// router.use('/example', ExampleRoute);

export default router;
