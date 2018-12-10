import express from 'express';
import { auth } from '../../middlewares';
import ExampleRoute from './ExampleRoute';
import AuthRoute from './AuthRoute';

const router = express.Router();

// Auth not required
router.use('/example', ExampleRoute);
router.use('/auth', AuthRoute);

// Auth required
router.use(auth.isAuthenticated);
// router.use('/example', ExampleRoute);

export default router;
