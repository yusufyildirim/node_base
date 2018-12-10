const express = require('express');
const { TestController } = require('../../controllers');

const router = express.Router();

router.get('/', TestController.root);

module.exports = router;
