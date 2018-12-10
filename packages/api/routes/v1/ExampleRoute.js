const express = require('express');
const { ExampleController } = require('../../controllers');

const router = express.Router();

router.get('/', ExampleController.root);

module.exports = router;
