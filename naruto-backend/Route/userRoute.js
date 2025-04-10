
const { login, register, getProfile } = require('../Controller/userController');
const express = require('express');
const router = express.Router();
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/user').get(getProfile);
// router.route('/session').get()



module.exports = router;
