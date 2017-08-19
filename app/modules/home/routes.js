
var express = require('express');

var router = express.Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;