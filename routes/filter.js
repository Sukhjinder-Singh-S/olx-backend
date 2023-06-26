const express = require('express');

const router = express.Router();

const filterController = require('../controllers/filter');

router.get('/search', filterController.search);
router.get('/filter/:catRef', filterController.filter);





module.exports = router