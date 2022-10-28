const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use(require('./authorization'));

router.use(auth);

router.use(require('./user'));
router.use(require('./movie'));

router.use(require('./defaultRoute'));

module.exports = router;
