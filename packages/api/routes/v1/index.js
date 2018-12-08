import express from 'express';
import { auth } from '../../middlewares';
import ExampleRoute from './ExampleRoute';

const router = express.Router();

// Auth not required
router.use('/example', ExampleRoute);

// Auth required
router.use(auth.isAuthenticated);
// router.use('/example', ExampleRoute);

export default router;
