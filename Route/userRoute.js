
const { login, register, getProfile } = require('../Controller/userController');
const express = require('express');
const router = express.Router();
router.route('/userLogin').post(login);
router.route('/useRegister').post(register);
router.route('/userProfile').get(getProfile);



module.exports = router;
