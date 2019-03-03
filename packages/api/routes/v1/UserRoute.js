const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

/*
 *
 * USER OPERATIONS
 *
 */
router.get('/', UserController.userList);


module.exports = router;
