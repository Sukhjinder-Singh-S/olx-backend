const express = require('express');

const router = express.Router();

const filterController = require('../controllers/logic');
const isAuth = require('../middleware/is-auth')

router.get('/search', filterController.search);
router.get('/filter/:catRef', filterController.filter);
router.patch('/liked',isAuth, filterController.like);
router.get('/favourite', isAuth, filterController.getFavourite)





module.exports = router