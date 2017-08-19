var router = require('express').Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);
router.use('/categories', require('./users/routes'));

exports.admin = router;


router.use(authMiddleware.hasAuth);
router.use('/categories', require('./users/routes'));

exports.user = router;