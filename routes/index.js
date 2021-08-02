const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRoute = require('./movies');
const usersRoute = require('./users');
const enterRoute = require('./sign');
const NotFoundError = require('../errors/not-found-err');

router.use('/', enterRoute);
router.use('/', auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));
module.exports = router;
