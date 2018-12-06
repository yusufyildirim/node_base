import express from 'express';
import { isAuthenticated } from '../../utils/auth';
import ExampleRoute from './ExampleRoute';
const router = express.Router();

// Auth not required
router.use('/example', ExampleRoute);

// Auth required
router.use(isAuthenticated);
//router.use('/example', ExampleRoute);

export default router;
