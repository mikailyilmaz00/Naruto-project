
const { updatePointsAndRank } = require('../Controller/pointController');
const express = require('express');
const router = express.Router();
router.route('/pointRank').put(updatePointsAndRank);

module.exports = router;
