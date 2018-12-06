import express from 'express';
import { ExampleController } from '../../controllers';

const router = express.Router();

router.get('/', ExampleController.root);

export default router;
