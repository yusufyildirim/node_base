import express from 'express';
import { TestController } from '../../controllers';

const router = express.Router();

router.get('/', TestController.root);

export default router;
